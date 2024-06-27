"use strict";

import { Component, WebComponent } from '#WebComponent';

import { ProfileImg, CardTitleText, CardBodyText } from '#common';

import css from './dev-card.css?inline';

export default Component ({
    tagName: 'dev-card',
    styleCSS: css
},

class DevCard extends WebComponent {   
    render() {
        const src = this.getAttribute('src');
        const devName = this.getAttribute('devName');
        const firstRole = this.getAttribute('firstRole');
        const secondRole = this.getAttribute('secondRole');

        return `
            <div class="card card-content align-items-center">
                <profile-img src="${src}"></profile-img>
                <div class="card-body">
                    <card-title-text color="#ABD9D9">${devName}</card-title-text>
                    <div class="card-body-content">
                        <card-body-text>${firstRole}</card-body-text>
                        ${!secondRole   ? ''
                                        :`<card-body-text style="margin-top:5px;">${secondRole}</card-body-text>`}
                    </div>
                </div>
            </div>
        `;
    }
});
