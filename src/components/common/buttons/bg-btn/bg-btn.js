import { Component, WebComponent } from '#WebComponent';

import css from './bg-btn.css?inline';

export default Component ({
    tagName: "bg-btn",
    styleCSS: css
},

class BgBtn extends WebComponent {
    render() {
        const bootStly = this.getAttribute("class") || '';
        const stly = this.getAttribute("style") || '';
        const text = this.innerHTML || 'Click me';

        return `
            <button class="btn bg-btn ${bootStly}" style="${stly}">${text}</button>
        `;
    }
});