import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_PRIMARY_COLOR, DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'primary-button',
    styleCSS: `
        .lighting{
            animation: cool-illuminate 1s ease-in forwards;
        }

        .shutdown{
            animation: cool-illuminate-reverse 1s ease-in forwards;
        }

        @keyframes cool-illuminate {
            0% {
                background-color: #5c5c89;
            }
            50% {
                background-color: #7a7ac3;
            }
            100% {
                background-color: #8D8DDA;
            }
        }

        @keyframes cool-illuminate-reverse {
            0% {
              background-color: #8D8DDA;
            }
            50% {
              background-color: #7a7ac3;
            }
            100% {
              background-color: #5c5c89;
            }
          }
          
    `
},

class PrimaryButton extends WebComponent {
    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;
        const color = this.getAttribute('color') || BUTTON_DEFAULT_PRIMARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;
        const claseName = this.getAttribute('claseName') || '';
        const txt_color = this.getAttribute('txt-color') || '#FFFFFF';
        const fontSize = this.getAttribute('fs') || '';

        return `
            <button
                class="btn btn-primary px-0 border-0 fw-semibold text-uppercase rounded-pill ${claseName}"
                style="width:${width}; height:${height}; background-color: ${color};"
            >
                <sub-header-text fs="${fontSize}" color="${txt_color}">${buttonText}</sub-header-text>
            </button>
        `;
    }
});