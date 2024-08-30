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
        const bootstrap = this.getAttribute('bootstrap') || '';
        const txt_color = this.getAttribute('txt-color') || '#FFFFFF';

        return `
            <button
                class="btn btn-primary px-0 border-0 fw-semibold text-uppercase rounded-pill ${bootstrap}"
                style="width:${width}; height:${height}; background-color: ${color}; "
            >
                <sub-header-text color="${txt_color}">${buttonText}</sub-header-text>
            </button>
        `;
    }
});