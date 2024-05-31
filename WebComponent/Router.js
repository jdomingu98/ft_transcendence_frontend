
/**
 * Router class that handles the routing of the application
 * @class
 * @since 1.0.0
 * @version 1.0.0
 */
class Router {
  static _singleton = null

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

  static initRouter(routes) {
    Router.routes = routes
    Router._singleton = new Router()
    Router._singleton._handleRoute()
  }

  static getInstance() {
    return this._singleton
  }

  back() {
    window.history.back()
  }

  forward() {
    window.history.forward()
  }

  push(path, state = {}) {
    window.history.pushState(state, '', path)
    this._handleRoute(state)
  }

  _handleRoute(state = {}) {
    const { pathname } = window.location
    const route = this._find(Router._removeEndingSlash(pathname))
    if (route) {
      document.querySelector('#app')
        .innerHTML = `<${route.component}${this._stateToHTMLAttributes(state)}></${route.component}>`
    }
  }

  _find(pathname) {
    // If I have /x/:y/:z and I have /x/1/hola it should match it and set params to { y: 1, z: 'hola' }
    return Router.routes.find(({ path }) => {
      const match = this._match(pathname, path)
      if (match)
        this.params = { ...match }
      return !!match
    })
  }

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

  _stateToHTMLAttributes(state) {
    return Object.entries(state).reduce((acc, [key, value]) => {
      return `${acc} ${key}="${value}"`
    }, '')
  }

  static _removeEndingSlash(path) {
    if (Router._hasSlashEnding(path))
      return path.slice(0, -1)
    return path
  }

  static _hasSlashEnding(path) {
    return path.endsWith('/') && path !== '/'
  }
}

export default Router