import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_PRIMARY_COLOR, DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'primary-button'
},

class PrimaryButton extends WebComponent {
    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;
        const color = this.getAttribute('color') || BUTTON_DEFAULT_PRIMARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;
        const className = this.getAttribute('className') || '';
        const txt_color = this.getAttribute('txt-color') || '#FFFFFF';
        const fontSize = this.getAttribute('fs') || '16px';

        return `
            <button
                class="btn btn-primary px-0 border-0 fw-semibold text-uppercase rounded-pill ${className}"
                style="width:${width}; height:${height}; background-color: ${color}; letter-spacing: 0.1em;"
            >
                <sub-header-text fs="${fontSize}" color="${txt_color}">${buttonText}</sub-header-text>
            </button>
        `;
    }
});