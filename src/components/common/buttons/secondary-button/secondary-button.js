import { Component, WebComponent } from '#WebComponent';

import css from './secondary-button.css?inline';

import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_SECONDARY_COLOR } from '/src/const/index.js';

export default Component ({
    tagName: "secondary-button",
    styleCSS: css
},

class SecondaryButton extends WebComponent {
    render() {
        const width = this.getAttribute("w") || "auto";
        const height = this.getAttribute("h") || "auto";
        const color = this.getAttribute("color") || BUTTON_DEFAULT_SECONDARY_COLOR;
        const buttonText = this.innerHTML || BUTTON_DEFAULT_MSG;
        return `
            <button
                id="secondary"
                class="btn btn-secondary"
                style="width: ${width}; height: ${height}; border: 1px solid ${color};"
            >
                ${buttonText}
            </button>
        `;
    }
});