
/**
 * Router class that handles the routing of the application
 * @class
 * @since 1.0.0
 * @version 2.0.0
 */
class Router {
    /**
     * The event name for the router push
     * @type {String}
     * @since 2.0.0
     * @version 2.0.0
     * @static
     * @memberof Router
     * @readonly
     */
    static ROUTER_EVENT = 'router-push';

    /**
     * The params of the application
     * @type {Object}
     * @since 1.0.0
     * @version 1.0.0
     * @static
     * @memberof Router
     * @readonly
     * @private
     * @description This object is used to store the params of the application
     */
    static _params = {};

    static {
        window.addEventListener('popstate', () => {
            Router._clearParams();
            Router._dispatchOnRouterPush(window.location.pathname);
        });
    }

    /**
     * Set a callback function when the router is pushed
     * @param {Function} callback - The callback function
     * @returns {void}
     * @since 2.0.0
     * @version 2.0.0
     * @memberof Router
     * @static
     * @description This function is used to set a callback function when the router is pushed
     */
    static onRouterPush(callback) {
        window.addEventListener(Router.ROUTER_EVENT, callback);
    }

    /**
     * Routes of the application
     * @type {Array}
     * @since 1.0.0
     * @version 1.0.0
     * @static
     * @memberof Router
     * @readonly
     */
    static getQuery() {
        const { search } = window.location;
        return search
            .slice(1)
            .split('&')
            .map(pair => pair.split('='))
            .reduce((acc, [key, value]) => ({
                ...acc,
                [key]: value
            }), {});
    }

    /**
     * Routes of the application
     * @type {Array}
     * @since 1.0.0
     * @version 2.0.0
     * @static
     * @memberof Router
     */
    static back() {
        window.history.back();
    }

    /**
     * Routes of the application
     * @type {Array}
     * @since 1.0.0
     * @version 2.0.0
     * @memberof Router
     */
    static forward() {
        window.history.forward();
    }

    /**
     * Routes of the application
     * @type {Array}
     * @since 1.0.0
     * @version 2.0.0
     * @memberof Router
     * @param {String} path - The path to push
     * @param {Object} state - The state object
     * @returns {void}
     * @static
     * @description This function is used to push a new path to the history
     * @example
     * Router.push('/home', { title: 'Home' })
     */
    static push(path, state = {}) {
        window.history.pushState(state, '', path);
        Router._clearParams();
        Router._dispatchOnRouterPush(path, state);
    }

    /**
     * Gets params of the application. They are stracted from the path regex.
     * For example, if the path is '/user/:id', the params will be { id: '1' }
     * @returns {String} The current path
     * @since 2.0.0
     * @version 2.0.0
     * @memberof Router
     * @static
     * @description This function is used to get the params of the application.
     * The params are stracted from the path regex. For example, if the path is '/user/:id', the params will be { id: '1' }
     */
    static getParams() {
        return Router._params;
    }

    /**
     * Routes of the application
     * @type {Array}
     * @since 1.0.0
     * @version 2.0.0
     * @static
     * @param {String} pathname - The pathname to find
     * @param {String} regexPath - The regex path
     * @returns {Object} The route object
     * @memberof Router
     * @description This function is used to match the pathname with the regex path
     */
    static match(regexPath) {
        const regexParts = Router._removeEndingSlash(regexPath).split('/');
        const pathnameParts = Router._removeEndingSlash(window.location.pathname).split('/');
        if (regexParts.length > pathnameParts.length)
            return false;

        for (let i = 0; i < regexParts.length; i++) {
            if (regexParts[i].startsWith(':')) {
                Router._addParam(regexParts[i].slice(1), pathnameParts[i]);
            } else if (regexParts[i] !== pathnameParts[i]) {
                return false;
            }
        }
        return true;
    }

    /* Private methods */

    /**
     * Function that dispatches the router push event
     * @param {string} path - The path to dispatch
     * @param {Object} state - The state object
     * @returns {void}
     * @since 2.0.0
     * @version 2.0.0
     * @memberof Router
     * @private
     * @static
     * @description This function is used to dispatch the router push event
     */
    static _dispatchOnRouterPush(path, state) {
        window.dispatchEvent(new CustomEvent(Router.ROUTER_EVENT, {
            detail: {
                path,
                state
            }
        }));
    }

    /**
     * This function is used to add a new param to the params object
     * @param {string} key - The key to add
     * @param {string} value - The value to add
     * @returns {void}
     * @since 2.0.0
     * @version 2.0.0
     * @memberof Router
     * @private
     * @static
     * @description This function is used to add a new param to the params object
     */
    static _addParam(key, value) {
        Router._params = {
            ...Router._params,
            [key]: value
        };
    }

    /**
     * This function is used to clear the params object
     * @returns {void}
     * @since 2.0.0
     * @version 2.0.0
     * @memberof Router
     * @private
     * @static
     * @description This function is used to clear the params object
     */
    static _clearParams() {
        Router._params = {};
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
            return path.slice(0, -1);
        return path;
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
        return path.endsWith('/') && path !== '/';
    }
}

export default Router;
