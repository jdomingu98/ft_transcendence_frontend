"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './main-title.css?inline';

export default Component ({
    tagName: "main-title",
    styleCSS: css
},
        
class MainTitle extends WebComponent {   
    render() {
        const text = this.innerHTML || "";

        return `
            <h3 class="text-center text-lg-start title">${text}</h3>
        `;
    }
});