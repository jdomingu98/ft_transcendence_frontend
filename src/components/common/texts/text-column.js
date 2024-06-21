"use strict";
import { Component, WebComponent } from '#WebComponent';

import FooterText from './footer-text.js';
import FooterTitle from './footer-title.js';

export default Component ({
    tagName: 'text-column',
},

class TextColumn extends WebComponent {   
    render() {
        const title = this.getAttribute('title') || '';
        const text = this.getAttribute('text') || '';
        const text2 = this.getAttribute('text2') || '';
        const text3 = this.getAttribute('text3') || '';

        return `
            <footer-title>${title}</footer-title>
            <div class="mt-4">
                ${ text ? `<footer-text>${text}</footer-text>` : ''}
                ${ text2 ? `<footer-text>${text2}</footer-text>` : ''}
                ${ text3 ? `<footer-text>${text3}</footer-text>` : ''}
            </div>
        `
    }
});