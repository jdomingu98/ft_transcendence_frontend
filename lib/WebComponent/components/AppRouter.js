import Component from '../Component.js';
import Router from '../Router.js';
import WebComponent from '../WebComponent.js';

export default Component({
    tagName: 'app-router',
},
class AppRouter extends WebComponent {
    /**
     * Routes of the application
     * @type {Array}
     * @since 1.1.0
     * @version 1.1.0
     * @param {Object} state - The state object
     * @returns {String} The HTML attributes
     * @memberof AppRouter
     * @private
     * @description This function is used to convert the state object to HTML attributes
     */
    _stateToHTMLAttributes(state) {
        return Object.entries(state).reduce((acc, [key, value]) => {
            return `${acc} ${key}="${value}"`;
        }, '');
    }

    init() {
        this.state = {
            pathname: window.location.pathname
        };
        Router.onRouterPush(({ detail }) => {
            this.setState({
                pathname: detail.path,
                // state: detail.state
            });
        });
    }



    render() {
        const routes = this.getAttribute('routes', []);
        const route = routes.find(({ path }) => Router.match(path));
        return route ? `<${route.component} ${this._stateToHTMLAttributes({})}></${route.component}>` : '';
    }
});