import { Component, WebComponent } from '#WebComponent';

import css from './h1-text.css?inline';

export default Component ({
    tagName: "h1-text",
    styleCSS: css
},

class H1Text extends WebComponent {
    render() {
        const content = this.innerHTML || '';

        return `
            <h1
                id="h1-text"
                class="text-align-center"
            >
                ${content}
            </h1>
        `;
    }
});