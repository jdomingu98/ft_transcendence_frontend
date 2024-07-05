import { toArray, toKebabCase } from "./utils"

/**
 * Component function
 * @function Component
 * @param {Object} config - The configuration object
 * @param {Object} webComponent - The WebComponent class
 * @returns {void}
 * @description This function is used to create a new WebComponent
 * @example
 * Component({
 *   tagName: 'my-button',
 *   stylesURL: ['my-button']
 *   styleCSS: `
 *    .my-button {
 *      background-color: red;
 *    }`
 * },
 * class MyButton {
 *   // Your code here
 * })
 * @since 1.0.0
 * @version 1.1.0
 */
function Component(config, webComponent) {
  webComponent.customCSS = toArray(config.stylesURL)
  webComponent.styleCSS = config.styleCSS || ''

  try {
    const nameToRegister = config.tagName || toKebabCase(webComponent.name)
    customElements.define(nameToRegister, webComponent)
  } catch (err) {
    console.error(err)
  }
  return webComponent
}

// function Component(wc) {
//   return Component({}, wc)
// }

export default Component

