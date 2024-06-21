"use strict";

import { Component, WebComponent } from '#WebComponent'

export default Component ({
    tagName: 'footer-text'
},

class FooterText extends WebComponent {
    render() {
        const text = this.innerHTML || '';

        return `
            <p class="text-light text-lg-start">${text}</p>
        `;
    }
});