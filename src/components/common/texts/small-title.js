"use strict";

import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: 'small-title'
},
        
class SmallTitle extends WebComponent {   
    render() {
        const text = this.innerHTML || '';

        return `
            <p class="fw-bold mb-0" style="color: #ABD9D9; font-size: 1.3rem; letter-spacing: 3px;">${text}</p>
        `;
    }
});