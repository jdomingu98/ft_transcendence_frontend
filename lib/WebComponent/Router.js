
/**
 * Router class that handles the routing of the application
 * @class
 * @since 1.0.0
 * @version 1.0.0
 */
class Router {
  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   * @static
   * @private
   */
  static _singleton = null

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   * @readonly
   */
  get query() {
    const { search } = window.location
    return search
      .slice(1)
      .split('&')
      .reduce((acc, pair) => {
        const [key, value] = pair.split('=')
        acc[key] = value
        return acc
      }, {})
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   * @static
   */
  static initRouter(routes) {
    Router.routes = routes
    Router._singleton = new Router()
    Router._singleton._handleRoute()
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   * @static
   */
  static getInstance() {
    return this._singleton
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   */
  back() {
    window.history.back()
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   */
  forward() {
    window.history.forward()
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @memberof Router
   * @param {String} path - The path to push
   * @param {Object} state - The state object
   * @returns {void}
   * @description This function is used to push a new path to the history
   * @example
   * Router.push('/home', { title: 'Home' })
   */
  push(path, state = {}) {
    window.history.pushState(state, '', path)
    this._handleRoute(state)
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.1
   * @memberof Router
   * @private
   * @param {Object} state - The state object
   * @returns {void}
   * @description This function is used to handle the route of the application
   * 
   */
  _handleRoute(state = {}) {
    const { pathname } = window.location
    const route = this._find(Router._removeEndingSlash(pathname))
    if (route) {
      document.querySelector('#app')
        .innerHTML = `<${route.component}${this._stateToHTMLAttributes(state)}></${route.component}>`
    }
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @param {String} pathname - The pathname to find
   * @returns {Object} The route object
   * @memberof Router
   * @private
   */
  _find(pathname) {
    // If I have /x/:y/:z and I have /x/1/hola it should match it and set params to { y: 1, z: 'hola' }
    return Router.routes.find(({ path }) => {
      const match = this._match(pathname, path)
      if (match)
        this.params = { ...match }
      return !!match
    })
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @param {String} pathname - The pathname to find
   * @param {String} regexPath - The regex path
   * @returns {Object} The route object
   * @memberof Router
   * @private
   * @description This function is used to match the pathname with the regex path
   */
  _match(pathname, regexPath) {
    const regexParts = regexPath.split('/')
    const pathnameParts = pathname.split('/')
    if (regexParts.length !== pathnameParts.length)
      return false

    const params = {}
    for (let i = 0; i < regexParts.length; i++) {
      if (regexParts[i].startsWith(':')) {
        params[regexParts[i].slice(1)] = pathnameParts[i]
      } else if (regexParts[i] !== pathnameParts[i]) {
        return false
      }
    }
    return params
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @param {Object} state - The state object
   * @returns {String} The HTML attributes
   * @memberof Router
   * @private
   * @description This function is used to convert the state object to HTML attributes
   */
  _stateToHTMLAttributes(state) {
    return Object.entries(state).reduce((acc, [key, value]) => {
      return `${acc} ${key}="${value}"`
    }, '')
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @param {String} path - The path to remove the ending slash
   * @returns {String} The path without the ending slash
   * @memberof Router
   * @private
   * @description This function is used to remove the ending slash from the path
   * @static
   */
  static _removeEndingSlash(path) {
    if (Router._hasSlashEnding(path))
      return path.slice(0, -1)
    return path
  }

  /**
   * Routes of the application
   * @type {Array}
   * @since 1.0.0
   * @version 1.0.0
   * @param {String} path - The path to check
   * @returns {Boolean} If the path has a slash ending
   * @memberof Router
   * @private
   * @description This function is used to check if the path has a slash ending
   * @static
   */
  static _hasSlashEnding(path) {
    return path.endsWith('/') && path !== '/'
  }
}

export default Router
