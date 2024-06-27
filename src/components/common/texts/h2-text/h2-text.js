import { Component, WebComponent } from '#WebComponent';

import css from './h2-text.css?inline';

export default Component ({
    tagName: "h2-text",
    styleCSS: css
},

class H2Text extends WebComponent {
    render() {
        const content = this.innerHTML || '';

        return `
            <h2 id="h2-text">${content}</h2>
        `;
    }
});