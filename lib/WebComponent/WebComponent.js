import Router from './Router.js'
import { stringToHTML, diff } from './diffing.js'
import { toCSSStyleSheet } from './utils.js'

/**
 * WebComponent class
 * @class WebComponent
 * @extends HTMLElement
 */
class WebComponent extends HTMLElement {
  /**
   * The state of the component.
   * @member {Object}
   */
  state = {}

  /**
   * The reference to the router instance to manipulate the routes.
   * @member {Router}
   */
  router = Router.getInstance()

  /**
   * The map to store the loaded CSS. It's used to avoid loading the same CSS multiple times.
   * @member {Map}
   */
  static _loadedCSS = new Map()

  /**
   * When the rerender is called, the bound event are not removed automatically.
   * This property is used to store the unbind function, which is intended to remove the event listeners.
   * It must be defined in the returned function of the bind method to unbind the event listeners bound there.
   * @member {Function}
   */
  _unbind = null

  /**
   * Subscriptions are a strategy to bind the event listeners and automatically unbind them when the component is removed.
   * This property is used to store the subscriptions so that they can be removed when the component is removed.
   * @member {Array}
   */
  _subscriptions = []

  static _globalCSS = []

  static _globalCSSFiles = []

  constructor() {
    super()
    this.init()
    if (this._useShadowDOM())
      this.attachShadow({ mode: 'open' })
    if (this._useShadowDOM()) {
      this.loadStylesOnce()
        .then(() => this._rerender())
    } else {
      this._rerender()
    }
  }

  /* Automatic lifecycle methods */

  /**
   * this method is automatically called when the component is connected to the DOM.
   * We see if the attributes has changed to see if we need to rerender the component.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return

    this.onChangeAttribute(name, oldValue, newValue)
    this._rerender()
  }

  /* Custom lifecycle methods */

  /**
   * This method is used to initialize the component.
   * It is called automatically when the component is created.
   */
  init() {}

  /**
   * This method is used to render the component.
   * It returns a string that represents the HTML of the component.
   */
  render() {
    throw new Error('You have to implement the render method')
  }

  /**
   * This method is called when an attribute has changed.
   * It is called automatically when an attribute has changed.
   * If the old value is the same as the new value or is the first time the attribute is set,
   * it won't be called.
   */
  onChangeAttribute(name, oldValue, newValue) {}

  /**
   * Bind the event listeners
   * @returns {Function} - The unbind function
   * 
   * @description This method is used to bind the event listeners
   * It's called once the component is rendered.
   * It should return a function that unbinds the event listeners
   * We can use the subscribe method to subscribe to events as is the most common way.
   * So it will be automatically unsubscribed when the component is removed.
   */
  bind() {}

  /* Custom methods */

  /**
   * This method is used to subscribe to an event,
   * which will be automatically unsubscribed when the component is rerendered or removed.
   * 
   * @param {string} query - The query selector
   * @param {string} event - The event name
   * @param {Function} callback - The callback function
   * @returns {void}
   * 
   */
  subscribe(query, event, callback) {
    const elem = this._getDOM().querySelector(query)
    elem.addEventListener(event, callback)
    this._subscriptions.push({ elem, event, callback })
  }

  /**
   * Set the state of the component
   * @param {Object} newState - The new state of the component
   * @returns {void}
   */
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    }
    this._rerender()
  }

  emit(name, detail) {
    const event = new CustomEvent(name, {
      detail,
      bubbles: true,
      cancelable: true,
      composed: true
    })
    this.dispatchEvent(event)
  }

  static getCSSOrLoad(cssKey) {
    if (!WebComponent._loadedCSS.has(cssKey))
      WebComponent._loadedCSS.set(cssKey, { loaded: false, promise: null, stylesheet: null })
    const css = WebComponent._loadedCSS.get(cssKey)
    // css contains { loaded: bool, promise: Promise<CSSStyleSheet>, stylesheet: CSSStyleSheet }
    if (css.loaded)
      return Promise.resolve(css.stylesheet)
    if (!css.promise) {
      css.promise = fetch(cssKey)
        .then(res => res.text())
        .then(toCSSStyleSheet)
        .then(stylesheet => {
          css.loaded = true
          css.stylesheet = stylesheet
          return stylesheet
        })
    }
    return css.promise
  }

  static defineGlobalCSS(css) {
    WebComponent._globalCSS = (!Array.isArray(css) ? [css] : css).map(toCSSStyleSheet)
  }

  static defineGlobalCSSFiles(cssFiles) {
    WebComponent._globalCSSFiles = !Array.isArray(cssFiles) ? [cssFiles] : cssFiles
  }

  async loadStylesOnce() {
    return Promise.all([
      ...WebComponent._globalCSSFiles.map(WebComponent.getCSSOrLoad),
      ...WebComponent._globalCSS,
      ...this.constructor.customCSS.map(WebComponent.getCSSOrLoad),
      this.constructor.styleCSS ? toCSSStyleSheet(this.constructor.styleCSS) : null,
    ])
      .then(css => css.filter(Boolean))
      .then(css => this._getDOM().adoptedStyleSheets = css)
  }

  /* Private methods */

  /**
   * Unsubscribe all the event listeners
   * @private
   * @returns {void}
   * @memberof WebComponent
   * @description This method is used to unsubscribe all the event listeners
   * @example
   * _unsubscribe()
   * @since 1.0.0
   * @version 1.0.0
   */
  _unsubscribe() {
    this._subscriptions.forEach(({ elem, event, callback }) => {
      elem.removeEventListener(event, callback)
    })
  }

  /**
   * This method is used to rerender the component
   * It removes all the previous event listeners and bindings before
   * performing a diff algorithm between the new and the old DOM using
   * a virtual DOM.
   * Then it binds again the event listeners.
   *
   * @returns {void}
   */
  _rerender() {
    this._unsubscribe()
    if (this._unbind)
      this._unbind()
    const node = stringToHTML(this.render())
    diff(node, this._getDOM())
    this._unbind = this.bind()
  }

  _getDOM() {
    return this._useShadowDOM() ? this.shadowRoot : this
  }

  _useShadowDOM() {
    return true
  }
}

export default WebComponent
