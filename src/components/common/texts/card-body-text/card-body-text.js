"use strict";

import css from './card-body-text.css?inline';

import { Component, WebComponent } from '#WebComponent'

export default Component ({
    tagName: 'card-body-text',
    styleCSS: css
},
        
class CardBodyText extends WebComponent {   
    render() {
        const content = this.innerHTML;
        const color = this.getAttribute('color') || 'white';

        return `
            <p
                id="card-body-text"
                class="text-center fw-medium px-4"
                style="color: ${color}"
            >
                    ${content}
            </p>
        `;
    }
});