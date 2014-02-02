walk(document.body);

function walk(node) 
{
	// I stole this function from here:
	// http://is.gd/mwZp7E
	
	var child, next;

	switch ( node.nodeType )  
	{
		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment
			child = node.firstChild;
			while ( child ) 
			{
				next = child.nextSibling;
				walk(child);
				child = next;
			}
			break;

		case 3: // Text node
			handleText(node);
			break;
	}
}

function handleText(textNode) 
{
	searchAndReplaceElement(textNode)
}

function decorateChar(char) {
    // Using the font element for now, might need to normalize another element if this doesn't work well
    var e = document.createElement("font");
    e.className = e.className + "C"+String(char.toLowerCase().charCodeAt(0))
    e.appendChild(document.createTextNode(char));
    return e;
}

function searchAndReplaceElement(textNode) {
    var strSrc = textNode.nodeValue; // for Text Nodes, the nodeValue property contains the text
    var fragment = document.createDocumentFragment();
    for (var i in strSrc) {
        j = "0123456789abcdefghijklmnopqrstuvxyz".indexOf(strSrc[i].toLowerCase())
        if (j >= 0) {
            fragment.appendChild(decorateChar(strSrc[i]));
        } else {
            fragment.appendChild(document.createTextNode(strSrc[i]))
        }
    }
    textNode.parentNode.replaceChild(fragment, textNode);
}
