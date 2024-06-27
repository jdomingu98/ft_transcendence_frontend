import { Component, WebComponent } from '#WebComponent';

import css from './sub-header-text.css?inline';

export default Component ({
    tagName: "sub-header-text",
    styleCSS: css
},

class SubHeaderText extends WebComponent {
    render() {
        const color = this.getAttribute('color') || 'white';
        const content = this.innerHTML || '';

        return `
            <p id="sub-header-text" style="color: ${color};">${content}</p>
        `;
    }
});