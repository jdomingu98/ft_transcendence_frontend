"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './footer-input.css?inline';

export default Component ({
    tagName: 'footer-input',
    styleCSS: css
},

class FooterInput extends WebComponent {   
    render() {
        return `
            <div class="input-group mb-3 mt-3">
                <input type="text" class="form-control p-2" placeholder="Email Address" aria-label="Email Address">
            </div>
            <div class="input-group mb-3">
                <input type="text" class="form-control bg-form" placeholder="Text here..." aria-label="Text here...">
            </div>
        `;
    }
});