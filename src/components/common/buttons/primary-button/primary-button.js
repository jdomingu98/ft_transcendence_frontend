import { Component, WebComponent } from '#WebComponent';

import css from './primary-button.css?inline';

import { SubHeaderText } from '#common';

import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_PRIMARY_COLOR } from '/src/const/index.js';

export default Component ({
    tagName: "primary-button",
    styleCSS: css
},

class PrimaryButton extends WebComponent {
    render() {
        const width = this.getAttribute("w") || "auto";
        const height = this.getAttribute("h") || "auto";
        const color = this.getAttribute("color") || BUTTON_DEFAULT_PRIMARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;

        return `
            <button
                id="primary"
                class="btn btn-primary align-items-center"
                style="width:${width}; height:${height}; background-color: ${color};"
            >
                <sub-heeader-text>${buttonText}</sub-header-text>
            </button>
        `;
    }
});