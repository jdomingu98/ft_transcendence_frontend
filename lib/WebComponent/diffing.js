/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
function getNodeType(node) {
	if (node.nodeType === 3) return 'text'
	if (node.nodeType === 8) return 'comment'
	return node.tagName.toLowerCase()
}

/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 */
function getNodeContent(node) {
	if (node.childNodes && node.childNodes.length > 0) return null;
	return node.textContent;
};

/**
 * Compare and update the attributes of a node
 * @param  {Node} templateNode The template node
 * @param  {Node} domNode      The DOM node
 */
function updateAttributes(templateNode, domNode) {
	const templateAttrs = templateNode.attributes || [];
	const domAttrs = domNode.attributes || [];

	// Remove any attributes in the DOM node that are not in the template node
	for (let i = domAttrs.length - 1; i >= 0; i--) {
		const attrName = domAttrs[i].name;
		if (!templateNode.hasAttribute(attrName)) {
			domNode.removeAttribute(attrName);
		}
	}

	// Set attributes from template node to DOM node
	for (let i = 0; i < templateAttrs.length; i++) {
		const attrName = templateAttrs[i].name;
		const attrValue = templateAttrs[i].value;
		if (domNode.getAttribute(attrName) !== attrValue) {
			domNode.setAttribute(attrName, attrValue);
		}
	}
};

/**
 * Compare the template to the UI and make updates
 * @param  {Node} template The template HTML
 * @param  {Node} elem     The UI HTML
 */
function diff(template, elem) {
	// Get arrays of child nodes
	const domNodes = Array.prototype.slice.call(elem.childNodes);
	const templateNodes = Array.prototype.slice.call(template.childNodes);

	// If extra elements in DOM, remove them
  for (let count = domNodes.length - templateNodes.length; count > 0; count--) {
    domNodes[domNodes.length - count].parentNode.removeChild(domNodes[domNodes.length - count]);
  }

	// Diff each item in the templateNodes
	templateNodes.forEach((node, index) => {
		// If element doesn't exist, create it
		if (!domNodes[index]) {
			elem.appendChild(node.cloneNode(true));
			return;
		}

		// If element is not the same type, replace it with new element
		if (getNodeType(node) !== getNodeType(domNodes[index])) {
			domNodes[index].parentNode.replaceChild(node.cloneNode(true), domNodes[index]);
			return;
		}

		// If content is different, update it
		let templateContent = getNodeContent(node);
		if (templateContent && templateContent !== getNodeContent(domNodes[index])) {
			domNodes[index].textContent = templateContent;
		}

    updateAttributes(node, domNodes[index]);

		// If target element should be empty, wipe it
		if (domNodes[index].childNodes.length > 0 && node.childNodes.length < 1) {
			domNodes[index].innerHTML = '';
			return;
		}

		// If element is empty and shouldn't be, build it up
		// This uses a document fragment to minimize reflows
		if (domNodes[index].childNodes.length < 1 && node.childNodes.length > 0) {
			let fragment = document.createDocumentFragment()
			diff(node, fragment);
			domNodes[index].appendChild(fragment)
			return;
		}

		// If there are existing child elements that need to be modified, diff them
		if (node.childNodes.length > 0) {
			diff(node, domNodes[index])
		}

	})

}

function stringToHTML(str) {
  const parser = new DOMParser();
	const doc = parser.parseFromString(str, 'text/html')
	return doc.body
}

export {
  diff,
  stringToHTML
}
