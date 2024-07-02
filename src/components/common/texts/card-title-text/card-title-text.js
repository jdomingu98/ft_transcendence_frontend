"use strict";

import { Component, WebComponent } from '#WebComponent'

import css from './card-title-text.css?inline';

export default Component ({
    tagName: 'card-title-text',
    styleCSS: css
},

class CardTitleText extends WebComponent {   
    render() {
        const title = this.innerHTML;
        const color = this.getAttribute('color') || 'white';

        return `
            <p
                id="card-title-text"
                class="fw-bolder mb-4 text-center"
                style="color: ${color}"
            >
                ${title}
            </p>
        `;
    }
});