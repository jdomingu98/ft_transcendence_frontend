"use strict";

import { Component, WebComponent } from '#WebComponent'

export default Component ({
    tagName: 'card-text'
},
        
class CardText extends WebComponent {   
    render() {
        const text = this.innerHTML || '';
        const style = this.getAttribute('style') || '';

        return `
            <h3 class="card-text text-light" style="${style}"> ${text} </h3>
        `;
    }
});