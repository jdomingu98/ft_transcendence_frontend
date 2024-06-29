import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: "h2-text"
},

class H2Text extends WebComponent {
    render() {
        const content = this.innerHTML || '';

        return `
            <h2 
                class="text-capitalize fw-bold"
                style="font-size: 55px;"
            >
                    ${content}
            </h2>
        `;
    }
});