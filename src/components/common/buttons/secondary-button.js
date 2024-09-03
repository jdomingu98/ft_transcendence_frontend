import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_SECONDARY_COLOR, DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'secondary-button'
},

class SecondaryButton extends WebComponent {
    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;
        const color = this.getAttribute('color') || BUTTON_DEFAULT_SECONDARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;
        const claseName = this.getAttribute('claseName') || '';
        const fontSize = this.getAttribute('fs') || ''

        return `
            <button
                class="btn btn-secondary border bg-transparent rounded-pill ${claseName}"
                style="width: ${width}; height: ${height}; border-color: ${color} !important;"
            >
                <sub-header-text fs="16px">${buttonText}<sub-header-text>
            </button>
        `;
    }
});