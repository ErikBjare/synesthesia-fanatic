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
    var e = document.createElement("C"+String(char.charCodeAt(0)));
    e.appendChild(document.createTextNode(char));
    return e;
}

function searchAndReplaceElement(textNode) {
    var strSrc = textNode.nodeValue; // for Text Nodes, the nodeValue property contains the text
    var strSearch = "a";
    var pos = strSrc.indexOf(strSearch);

    if(pos >= 0) {
        var fragment = document.createDocumentFragment();

        if(pos > 0)
            fragment.appendChild(document.createTextNode(strSrc.substr(0, pos)));

        fragment.appendChild(decorateChar(strSearch));

        if((pos + strSearch.length + 1) < strSrc.length)
            fragment.appendChild(document.createTextNode(strSrc.substr(pos + strSearch.length)));

        textNode.parentNode.replaceChild(fragment, textNode);
        return true;
    }
}
