import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_PRIMARY_COLOR, DEFAULT_DIMENSION_VALUE } from '#const';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'primary-button'
},

class PrimaryButton extends WebComponent {
    render() {
        const id = this.getAttribute('id') || '';
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;
        const color = this.getAttribute('color') || BUTTON_DEFAULT_PRIMARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;
        const txt_color = this.getAttribute('txt-color') || 'white';

        return `
            <button ${id ? `id=${id}` : ''}
                class="btn btn-primary px-0 border-0 fw-semibold text-uppercase rounded-pill"
                style="width:${width}; height:${height}; background-color: ${color}; letter-spacing: 0.1em;">
                    <p class="text-uppercase fw-semibold m-0"
                        style="letter-spacing: 0.1em; color: ${txt_color}; font-size:1.2rem">${buttonText}</p>
            </button>
        `;
    }
});