/**
 * Get the type for a node
 * @param  {Node}   node The node
 * @return {String}      The type
 * @since 1.0.0
 * @version 1.0.0
 */
function getNodeType(node) {
    if (node.nodeType === 3) return 'text';
    if (node.nodeType === 8) return 'comment';
    return node.tagName.toLowerCase();
}

/**
 * Get the content from a node
 * @param  {Node}   node The node
 * @return {String}      The type
 * @since 1.0.0
 * @version 1.0.0
 */
function getNodeContent(node) {
    if (node.childNodes && node.childNodes.length > 0) return null;
    return node.textContent;
};

/**
 * Compare and update the attributes of a node
 * @param  {Node} templateNode The template node
 * @param  {Node} domNode      The DOM node
 * @since 1.0.0
 * @version 1.0.0
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
 * @since 1.0.0
 * @version 1.0.0
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
        const templateContent = getNodeContent(node);
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
            const fragment = document.createDocumentFragment();
            diff(node, fragment);
            domNodes[index].appendChild(fragment);
            return;
        }

        // If there are existing child elements that need to be modified, diff them
        if (node.childNodes.length > 0) {
            diff(node, domNodes[index]);
        }

    });

}

/**
 * Convert a string to an HTML element
 * @param {string} str
 * @returns {HTMLElement}
 * @since 1.0.0
 * @version 1.0.0
 */
function stringToHTML(str) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(str, 'text/html');
    return doc.body;
}

function isObjectOrArray(value) {
    return typeof value === 'object' && value !== null;
}

/**
 * Evaluate the attributes of a node
 * @param {Element} node
 * @param {*} context
 * @since 1.1.0
 * @version 1.1.0
 */
function evaluateAttributes(node, context) {
    if (node.nodeType === Node.ELEMENT_NODE) {
    // Iterate over node's attributes
        for (const attr of node.attributes) {
            if (attr.name.startsWith('[') && attr.name.endsWith(']')) {
                const attributeName = attr.name.slice(1, -1);

                const evaluatedValue = evaluate(attr.value, context);
                if (evaluatedValue !== undefined && evaluatedValue !== null)
                    node.setAttribute(
                        attributeName,
                        isObjectOrArray(evaluatedValue) ? JSON.stringify(evaluatedValue) : evaluatedValue
                    );
            }
        }
    }
    if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        if (text.includes('{{') && text.includes('}}')) {
            try {
                const jsText = text.slice(text.indexOf('{{') + 2, text.indexOf('}}'));
                const evaluatedValue = evaluate(jsText, context);
                node.textContent = evaluatedValue;
            } catch (e) {
                // eslint-disable-next-line no-console
                console.error(`Error evaluando la expresión ${text}:`, e);
            }
        }
    }
    // Evaluate recursively children nodes
    for (const child of node.childNodes) {
        evaluateAttributes(child, context);
    }
}

function evaluate(value, context) {
    try {
        return new Function('context', `with(context) { return ${value} }`)(context);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.error(`Error evaluating value ${value}:`, e);
    }
    return undefined;
}

export {
    diff,
    stringToHTML,
    evaluateAttributes
};
