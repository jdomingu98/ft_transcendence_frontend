import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: "h1-text"
},

class H1Text extends WebComponent {
    render() {
        const content = this.innerHTML || '';

        return `
            <h1
                class="text-capitalize fw-bold"
                style="font-size: 80px;"
            >
                ${content}
            </h1>
        `;
    }
});