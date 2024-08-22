import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_PRIMARY_COLOR, DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'primary-button',
    styleCSS: `

        @media (max-width: 1050px) {
            .modal{
                background-color: red !important;
                width: 20% !important;
                height: 30% !important;
            }
        }

        .animation{
            animation: slideIn 1s ease-in-out;
        }

        @keyframes slideIn {
            from { transform: translateX(-100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `
},

class PrimaryButton extends WebComponent {
    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;
        const color = this.getAttribute('color') || BUTTON_DEFAULT_PRIMARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;
        const bootstrap = this.getAttribute('bootstrap') || '';
        const ani = this.getAttribute('animation') || false;
        const animation = ani === 'true'? 'animation' : '';

        return `
            <button
                class="btn btn-primary px-0 border-0 fw-semibold text-uppercase rounded-pill ${bootstrap} ${animation}"
                style="width:${width}; height:${height}; background-color: ${color}; letter-spacing: 0.1em; font-size: 16px;"
            >
                <sub-header-text>${buttonText}</sub-header-text>
            </button>
        `;
    }
});