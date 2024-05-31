import Router from './Router.js'
import { stringToHTML, diff } from './diffing.js'

const GLOBAL_CSS = [
  'bootstrap-5.3.3-dist/css/bootstrap.min.css',
  'styles.css',
]

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
   * The map to store the loaded CSS. It's used to avoid loading the same CSS multiple times.
   * @member {Map}
   * @private
   * @static
   * @const
   * @default
   * @memberof WebComponent
   * @description This property is used to store the loaded CSS. It's used to avoid loading the same CSS multiple times.
   * @since 1.0.0
   * @version 1.0.0
   */
  static _loadedCSS = new Map()

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
      this.loadStylesOnce()
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
   * @todo ...
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!oldValue || oldValue === newValue) return

    this.onChangeAttribute(name, oldValue, newValue)
    this._rerender()
  }

  /* Custom lifecycle methods */

  /**
   * @todo ...
   */
  init() {}

  /**
   * @todo ...
   */
  render() {
    throw new Error('You have to implement the render method')
  }

  /**
   * @todo ...
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
   * 
   * @param {string} query - The query selector
   * @param {string} event - The event name
   * @param {Function} callback - The callback function
   * @returns {void}
   * 
   * @memberof WebComponent
   * @description This method is used to subscribe to an event
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
        .then(css => {
          const stylesheet = new CSSStyleSheet()
          stylesheet.replaceSync(css)
          return stylesheet
        })
        .then(stylesheet => {
          css.loaded = true
          css.stylesheet = stylesheet
          return stylesheet
        })
    }
    return css.promise
  }

  async loadStylesOnce() {
    return Promise.all([
      ...GLOBAL_CSS.map(WebComponent.getCSSOrLoad),
      this.constructor.customCSS ? WebComponent.getCSSOrLoad(this.constructor.customCSS) : Promise.resolve(null),
    ])
      .then(css => css.filter(Boolean))
      .then((css) => {
        this._getDOM().adoptedStyleSheets = css
      })
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

  _getDOM() {
    return this._useShadowDOM() ? this.shadowRoot : this
  }

  _useShadowDOM() {
    return true
  }
}

export default WebComponent
