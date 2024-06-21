"use strict";

import { Component, WebComponent } from '#WebComponent'

export default Component ({
    tagName: 'card-title',
},

class CardTitle extends WebComponent {   
    render() {
        const text = this.innerHTML || '';

        return `
            <h5 class="card-title text-light fw-bold mb-4">${text}</h5>
        `;
    }
});