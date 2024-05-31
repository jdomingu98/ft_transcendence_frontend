function toKebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Component function
 * @function Component
 * @param {Object} config - The configuration object
 * @param {Object} webComponent - The WebComponent class
 * @returns {void}
 * @description This function is used to create a new WebComponent
 * @example
 * Component({
 *  tagName: 'my-button',
 *  stylesURL: 'my-button'
 * },
 * class MyButton {
 * // Your code here
 * })
 * @since 1.0.0
 * @version 1.0.0
 */
function Component(config, webComponent) {
  if (config.stylesURL)
    webComponent.customCSS = config.stylesURL

  try {
    const nameToRegister = config.tagName || toKebabCase(webComponent.name)
    customElements.define(nameToRegister, webComponent)
  } catch (err) {
    console.error(err)
  }
}

// function Component(wc) {
//   return Component({}, wc)
// }

export default Component

