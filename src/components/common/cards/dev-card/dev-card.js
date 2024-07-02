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
            <div class="card mt-4 border-0 card-content text-uppercase">
                <profile-img src="${src}"></profile-img>
                <div class="card-body">

                    <card-title-text
                        color="var(--app-secondary-color)"
                    >
                        ${devName}
                    </card-title-text>

                    <div
                        class="d-flex flex-column justify-content-center"
                        style="height: 90%;"
                    >
                        <card-body-text>${firstRole}</card-body-text>
                        ${!secondRole   ? '' :`<card-body-text>${secondRole}</card-body-text>`}
                    </div>
                </div>
            </div>
        `;
    }
});
