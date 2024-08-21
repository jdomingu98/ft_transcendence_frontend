import Component from '../Component.js';
import Router from '../Router.js';
import WebComponent from '../WebComponent.js';

export default Component({
    tagName: 'router-link',
    styleCSS: `
        .link {
            cursor: pointer;
            color: var(--app-primary-text-color);
            text-decoration: none;
        }
    `
},
class RouterLink extends WebComponent {
    bind() {
        this.subscribe('a', 'click', event => {
            event.preventDefault();
            const url = this.getAttribute('href');
            Router.push(url);
        });
    }

    render() {
        return `
            <a class="link">${this.innerHTML}</a>
        `;
    }
});