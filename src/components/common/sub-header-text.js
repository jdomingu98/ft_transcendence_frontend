import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'sub-header-text',
},

class SubHeaderText extends WebComponent {
    render() {
        const color = this.getAttribute('color') || 'white';
        const content = this.innerHTML;
        const fontSize = this.getAttribute('fs') || 18;

        return `
            <p
                class="text-uppercase fw-semibold m-0"
                style="letter-spacing: 0.1em; font-size: ${fontSize}; color: ${color};">${content}</p>
        `;
    }
});