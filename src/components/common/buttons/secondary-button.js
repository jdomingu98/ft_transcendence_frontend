import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_SECONDARY_COLOR, DEFAULT_DIMENSION_VALUE } from '#const';
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
        return `
            <button
                class="btn btn-secondary border bg-transparent rounded-pill"
                style="width: ${width}; height: ${height}; border-color: ${color} !important; "
            >
                <sub-header-text>${buttonText}<sub-header-text>
            </button>
        `;
    }
});