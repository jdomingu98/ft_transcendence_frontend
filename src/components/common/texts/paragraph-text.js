"use strict";

import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: 'paragraph-text'
},

class ParagraphText extends WebComponent {   
    render() {
        const text = this.innerHTML || '';

        return `
            <p class="mt-3 text-light">${text}</p>
        `;
    }
});