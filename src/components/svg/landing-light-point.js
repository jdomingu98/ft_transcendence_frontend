"use strict";

import { Component, WebComponent } from '#WebComponent';

export default Component ({
    tagName: 'landing-light-point'
},

class LightPoint extends WebComponent {
    render() {
        const radio = this.getAttribute('radio') || 10;
        const cx = this.getAttribute('cx') || 0;
        const cy = this.getAttribute('cy') || 0;
        const fill = this.getAttribute('fill') || 'white';
        return `
            <svg height="400px" width="800px" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="blur" x="0" y="0" xmlns="http://www.w3.org/2000/svg">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
                    </filter>
                </defs>
                <circle r="${radio}" cx="${cx}" cy="${cy}" fill="${fill}" opacity="0.3" filter="url(#blur)"></circle>
            </svg>
        `;
    }
});