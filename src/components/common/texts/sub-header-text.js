import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: "sub-header-text",
},

class SubHeaderText extends WebComponent {
    render() {
        const color = this.getAttribute('color') || 'white';
        const content = this.innerHTML;

        return `
            <p
                class="text-uppercase fw-semibold m-0"
                style="letter-spacing: 0.1em; font-size: 20px; color: ${color};">${content}</p>
        `;
    }
});