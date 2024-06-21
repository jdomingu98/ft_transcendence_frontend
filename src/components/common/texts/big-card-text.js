"use strict";

import { Component, WebComponent } from '#WebComponent'

export default Component ({
    tagName: 'big-card-text'
},

class BigCardText extends WebComponent {   
    render() {
        const text = this.innerHTML || '';

        return `
            <h4 class="card-title" style="color: #0000000;">${text}</h4>
        `;
    }
});