import { Component, WebComponent } from '#WebComponent';

import css from './body-text.css?inline';

export default Component ({
    tagName: "body-text",
    styleCSS: css
},

class BodyText extends WebComponent {
    render() {
        const content = this.innerHTML || '';

        return `
            <p id="body-text">${content}</p>
        `;
    }
});