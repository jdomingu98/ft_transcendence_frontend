import { Component, WebComponent } from '#WebComponent';

import css from './lg-btn.css?inline';

export default Component ({
    tagName: "lg-btn",
    styleCSS: css
},

class LgBtn extends WebComponent {
    render() {
        const text = this.innerHTML || 'Click me';

        return `
            <button class="language-btn"> ${text} </button>
        `;
    }
});