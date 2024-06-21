"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './big-title.css?inline';

export default Component ({
    tagName: 'big-title',
    styleCSS: css
},
            
class BigTitle extends WebComponent {   
    render() {
        const text = this.innerHTML || '';

        return `
            <h1 class="mt-4 big-title">${text}</h1>
        `;
    }
});