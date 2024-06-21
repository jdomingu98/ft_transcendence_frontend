"use strict";

import { Component, WebComponent } from '#WebComponent';

import { CardTitle, CardText } from '#common';

import css from './small-card.css?inline';

export default Component ({
    tagName: 'small-card',
    styleCSS: css
},

class SmallCard extends WebComponent {   
    render() {
        const src = this.getAttribute('src') || 'No image found';
        const title = this.getAttribute('title') || '';
        const text = this.getAttribute('text') || '';
        const text2 = this.getAttribute('text2') || '';

        return `
            <div class="card text-center">
                <img class="card-img-top" src="${src}"></img>
                <div class="card-body">
                    <card-title>${title}</card-title>
                    <card-text>${text}</card-text>
                    ${ text2 ? `<card-text style="margin-top:5px;">${text2}</card-text>` : ''};
                </div>
            </div>
        `
    }
});
