
import { Component, WebComponent } from '#WebComponent';

import css from './tr-btn.css?inline';

export default Component ({
    tagName: 'tr-btn',
    styleCSS: css
},

class TrBtn extends WebComponent {
    render() {
        const text = this.innerHTML || 'Click me';
        return `<button class="btn tr-btn">${text}</button>`
    }
});