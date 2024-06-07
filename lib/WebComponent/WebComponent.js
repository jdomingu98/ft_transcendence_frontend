import Router from './Router.js'
import { stringToHTML, diff } from './diffing.js'
import { toArray, toCSSStyleSheet } from './utils.js'

/**
 * WebComponent class
 * @class WebComponent
 * @extends HTMLElement
 * @description This class is a base class for creating web components
 * @example
 * class MyComponent extends WebComponent {
 *  init() {
 *     this.state = {
 *     name: 'John'
 *    }
 *  }
 *  
 *  render() {
 *    return `
 *    <h1>Hello, ${this.state.name}</h1>
 *    `
 *  }
 * }
 * 
 * @since 1.0.0
 * @version 1.0.0
 */
class WebComponent extends HTMLElement {
  /**
   * The state of the component.
   * @member {Object}
   * @public
   * @default
   * @memberof WebComponent
   * @instance
   * @description This property is used to store the state of the component
   * @since 1.0.0
   * @version 1.0.0
   */
  state = {}

  /**
   * The reference to the router instance to manipulate the routes.
   * @member {Router}
   * @public
   * @const
   * @default
   * @memberof WebComponent
   * @instance
   * @description This property is used to store the reference to the router instance to manipulate the routes.
   * @see Router
   * @since 1.0.0
   * @version 1.0.0
   */
  router = Router.getInstance()

  /**
   * This map stores CSS loaded to avoid loading the same CSS multiple times.
   * @member {Map}
   * @private
   * @static
   * @const
   * @default
   * @memberof WebComponent
   * @description This map stores CSS loaded to avoid loading the same CSS multiple times.
   * @since 1.0.0
   * @version 1.0.0
   */
  static _loadedCSS = new Map()

  /**
   * This variable stores CSS shared between all the components.
   * @member {Array.<CSSStyleSheet>}
   * @private
   * @static
   * @default
   * @memberof WebComponent
   * @description This property is used to store the global CSS shared between all the components.
   * @since 1.1.0
   * @version 1.1.0
   */
  static _globalCSS = []

  /**
   * This variable stores the CSS files shared between all the components.
   * @member {Array.<string>}
   * @private
   * @static
   * @default
   * @memberof WebComponent
   * @description This property is used to store the CSS files shared between all the components.
   * @since 1.1.0
   * @version 1.1.0
   */
  static _globalCSSFiles = []

  /**
   * When the rerender is called, the bound event are not removed automatically.
   * This property is used to store the unbind function, which is intended to remove the event listeners.
   * It must be defined in the returned function of the bind method to unbind the event listeners bound there.
   * @member {Function}
   * @private
   * @memberof WebComponent
   * @instance
   * @description This property is used to store the unbind function. When the rerender is called, the bound event are not removed automatically.
   * This property is used to store the unbind function, which is intended to remove the event listeners.
   * It must be defined in the returned function of the bind method to unbind the event listeners bound there.
   * @since 1.0.0
   * @version 1.0.0
   */
  _unbind = null

  /**
   * Subscriptions are a strategy to bind the event listeners and automatically unbind them when the component is removed.
   * This property is used to store the subscriptions so that they can be removed when the component is removed.
   * @member {Array}
   * @private
   * @memberof WebComponent
   * @instance
   * @description This property is used to store the subscriptions. Subscriptions are a strategy to bind the event listeners and automatically unbind them when the component is removed.
   * This property is used to store the subscriptions so that they can be removed when the component is removed.
   * @since 1.0.0
   * @version 1.0.0
   */
  _subscriptions = []

  constructor() {
    super()
    this.init()
    if (this._useShadowDOM())
      this.attachShadow({ mode: 'open' })
    if (this._useShadowDOM()) {
      this._loadStylesOnce()
        .then(() => this._rerender())
    } else {
      this._rerender()
    }
  }

  /* Automatic lifecycle methods */

  /**
   * @todo ...
   */
  connectedCallback() {}

  /**
   * @todo ...
   */
  disconnectedCallback() {}

  /**
   * this method is automatically called when the component is connected to the DOM.
   * We see if the attributes has changed to see if we need to rerender the component.
   * @param {string} name - The name of the attribute
   * @param {string} oldValue - The old value of the attribute
   * @param {string} newValue - The new value of the attribute
   * @returns {void}
   * @memberof WebComponent
   * @description This method is automatically called when the component is connected to the DOM.
   * We see if the attributes has changed to see if we need to rerender the component.
   * @since 1.0.0
   * @version 1.0.0
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
   * @returns {void}
   * @memberof WebComponent
   * @description This method is used to initialize the component.
   * It is called automatically when the component is created.
   * 
   * @example
   * init() {
   *   this.state = {
   *     name: 'Jiafei',
   *     age: NaN,
   *     weight: 0,
   *   }
   * }
   * @since 1.0.0
   * @version 1.0.0
   */
  init() {}

  /**
   * This method is used to render the component.
   * It returns a string that represents the HTML of the component.
   * @returns {string} - The HTML of the component
   * @memberof WebComponent
   * @description This method is used to render the component.
   * It returns a string that represents the HTML of the component.
   * 
   * @example
   * render() {
   *   return `
   *     <h1>Hello, ${this.state.name}</h1>
   *     <p>Age: ${this.state.age}</p>
   *     <p>Weight: ${this.state.weight}</p>
   *   `
   * }
   * @since 1.0.0
   * @version 1.0.0
   */
  render() {
    throw new Error('You have to implement the render method')
  }

  /**
   * This method is called when an attribute has changed.
   * It is called automatically when an attribute has changed.
   * If the old value is the same as the new value or is the first time the attribute is set,
   * it won't be called.
   * @param {string} name - The name of the attribute
   * @param {string} oldValue - The old value of the attribute
   * @param {string} newValue - The new value of the attribute
   * @returns {void}
   * @memberof WebComponent
   * @description This method is called when an attribute has changed.
   * It is called automatically when an attribute has changed.
   * If the old value is the same as the new value or is the first time the attribute is set,
   * it won't be called.
   * 
   * @example
   * onChangeAttribute(name, oldValue, newValue) {
   *   if (name === 'name') {
   *     this.setState({ name: newValue })
   *   }
   * }
   * @since 1.0.0
   * @version 1.0.0
   */
  onChangeAttribute(name, oldValue, newValue) {}

  /**
   * Bind the event listeners
   * @returns {Function} - The unbind function
   * @memberof WebComponent
   * 
   * @description This method is used to bind the event listeners
   * It's called once the component is rendered.
   * It should return a function that unbinds the event listeners
   * We can use the subscribe method to subscribe to events as is the most common way.
   * So it will be automatically unsubscribed when the component is removed.
   * @example
   * bind() {
   *  // Subscription with subscribe method
   *  subscribe('button', 'click', () => console.log('Hello'))
   *  // Subscription without subscribe method
   *  const button = this._getDOM().querySelector('button')
   *  button.addEventListener('click', () => console.log('Hello'))
   *  // Return the unbind function
   *  return () => {
   *   // We needn't unsubscribe the event listeners made with subscribe method.
   *   // It's done automatically by the _unsubscribe method.
   *   button.removeEventListener('click', () => console.log('Hello'))
   *  }
   * }
   * @since 1.0.0
   * @version 1.0.0
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
   * @memberof WebComponent
   * @description This method is used to subscribe to an event,
   * which will be automatically unsubscribed when the component is rerendered or removed.
   * @example
   * subscribe('button', 'click', () => console.log('Hello'))
   * @since 1.0.0
   * @version 1.0.0
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
   * @memberof WebComponent
   * @description This method is used to set the state of the component
   * @example
   * setState({ name: 'John' })
   * @since 1.0.0
   * @version 1.0.0
   */
  setState(newState) {
    this.state = {
      ...this.state,
      ...newState
    }
    this._rerender()
  }

  /**
   * Emit an event
   * @param {string} name - The name of the event
   * @param {any} detail - The detail of the event
   * @returns {void}
   * 
   * @memberof WebComponent
   * @description This method is used to emit an event
   * @example
   * emit('my-event', { name: 'John' })
   * @since 1.0.0
   * @version 1.0.0
   */
  emit(name, detail) {
    const event = new CustomEvent(name, {
      detail,
      bubbles: true, // The event bubbles up through the DOM
      cancelable: true, // The event is cancelable (it can be canceled with preventDefault())
      composed: true // The event will cross the shadow DOM boundary
    })
    this.dispatchEvent(event)
  }

  /**
   * This method returns a promise of the CSS stylesheet.
   * If it is not in the cache, it will fetch the CSS file and convert it to a CSS stylesheet.
   * If it is called again but it hasn't been resolved yet, it will return the same promise.
   * If it is in the cache, it will resolve the promise with the CSS stylesheet directly.
   * @private
   * @param {string} cssURI - URI of the CSS
   * @returns {Promise<CSSStyleSheet>} - The CSS stylesheet
   * @memberof WebComponent
   * @description This method returns a promise of the CSS stylesheet.
   * If it is not in the cache, it will fetch the CSS file and convert it to a CSS stylesheet.
   * If it is called again but it hasn't been resolved yet, it will return the same promise.
   * If it is in the cache, it will resolve the promise with the CSS stylesheet directly.
   * @since 1.0.0
   * @version 1.0.0
   */
  static _getCSSOrLoad(cssURI) {
    if (!WebComponent._loadedCSS.has(cssURI))
      WebComponent._loadedCSS.set(cssURI, { loaded: false, promise: null, stylesheet: null })
    const css = WebComponent._loadedCSS.get(cssURI)
    // css contains { loaded: bool, promise: Promise<CSSStyleSheet>, stylesheet: CSSStyleSheet }
    if (css.loaded)
      return Promise.resolve(css.stylesheet)
    if (!css.promise) {
      css.promise = fetch(cssURI)
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

  /**
   * Define the global CSS
   * @static
   * @param {string|Array.<string>} css - The CSS or an array of CSS
   * @returns {void}
   * @memberof WebComponent
   * 
   * @description This method is used to define the global CSS
   * @example
   * WebComponent.defineGlobalCSS(`
   *   body {
   *     background-color: red;
   *   }
   * `)
   * import css from './my-button.css'
   * WebComponent.defineGlobalCSS([
   *  "body { background-color: red; }",
   *   css
   * ])
   *
   * @since 1.1.0
   * @version 1.1.0
   */
  static defineGlobalCSS(css) {
    WebComponent._globalCSS = toArray(css).map(toCSSStyleSheet)
  }

  /**
   * Define the global CSS files
   * @static
   * @param {string|Array.<string>} cssFiles - The CSS files or an array of CSS files
   * @returns {void}
   * @memberof WebComponent
   * 
   * @description This method is used to define the global CSS files
   * @example
   * WebComponent.defineGlobalCSSFiles('my-button.css')
   * @since 1.1.0
   * @version 1.1.0
   */
  static defineGlobalCSSFiles(cssFiles) {
    WebComponent._globalCSSFiles = toArray(cssFiles)
  }

  /**
   * This method is used to load the class styles.
   * It loads the global CSSs (files and styles) and also loads the styleCSS if it is defined.
   * If any CSS is already loaded, it won't be loaded again.
   * It returns a promise that resolves when all the CSSs are loaded.
   * @private
   * @returns {Promise<void>}
   * @memberof WebComponent
   * @description This method is used to load the class styles.
   * It loads the global CSSs (files and styles) and also loads the styleCSS if it is defined.
   * If any CSS is already loaded, it won't be loaded again.
   * It returns a promise that resolves when all the CSSs are loaded.
   * @since 1.0.0
   * @version 1.1.0
   */
  async _loadStylesOnce() {
    return Promise.all([
      ...WebComponent._globalCSSFiles.map(WebComponent._getCSSOrLoad),
      ...WebComponent._globalCSS,
      ...this.constructor.customCSS.map(WebComponent._getCSSOrLoad),
      this.constructor.styleCSS ? toCSSStyleSheet(this.constructor.styleCSS) : null,
    ])
      .then(css => css.filter(Boolean))
      .then(css => this._getDOM().adoptedStyleSheets = css)
  }

  // async addBootstrap() {
  //   const script = document.createElement('script')
  //   script.src = 'bootstrap-5.3.3-dist/js/bootstrap.min.js'
  //   this._getDOM().appendChild(script)
  //   return new Promise(resolve => {
  //     script.onload = resolve
  //   })
  // }

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
   * Rerender the component
   * @private
   * @returns {void}
   * @memberof WebComponent
   * @description This method is used to rerender the component
   * It removes all the previous event listeners and bindings before
   * performing a diff algorithm between the new and the old DOM using
   * a virtual DOM.
   * Then it binds again the event listeners.
   * @example
   * _rerender()
   * @since 1.0.0
   * @version 1.0.0
   */
  _rerender() {
    this._unsubscribe()
    if (this._unbind)
      this._unbind()
    const node = stringToHTML(this.render())
    diff(node, this._getDOM())
    this._unbind = this.bind()
  }

  /**
   * Get the DOM
   * @private
   * @returns {HTMLElement}
   * @memberof WebComponent
   * @description This method is used to get the DOM
   * @version 1.0.0
   * @since 1.0.0
   */
  _getDOM() {
    return this._useShadowDOM() ? this.shadowRoot : this
  }

  /**
   * Use the shadow DOM
   * @private
   * @returns {boolean}
   * @memberof WebComponent
   * @description This method is used to use the shadow DOM
   * @version 1.0.0
   * @since 1.0.0
   */
  _useShadowDOM() {
    return true
  }
}

export default WebComponent
