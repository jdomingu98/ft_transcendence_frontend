"use strict";

import { Component, WebComponent } from '#WebComponent'

export default Component ({
    tagName: 'footer-title'
},

class FooterTitle extends WebComponent {
    render() {
        const text = this.innerHTML || '';
        
        return `
            <h5 class="text-light text-lg-start fw-bold">${text}</h5>
        `;
    }
});