"use strict";

import { Component, WebComponent } from '#WebComponent'

import { SubHeaderText, H2Text, DevCard } from '#common';

export default Component ({
    tagName: 'landing-dev-cards'
},

class LandingDevCards extends WebComponent {
    init() {
        this.state = {
            devsInfo: [{
                src: 'src/resources/devs/aruzafa-.jpg',
                name: 'aruzafa-',
                firstRole: 'project manager',
                secondRole: 'fullstack developer',
            }, {
                src: 'src/resources/devs/atrujill.jpg',
                name: 'atrujill',
                firstRole: 'backend developer',
                secondRole: '',
            }, {
                src: 'src/resources/devs/cmorales.jpg',
                name: 'cmorales',
                firstRole: 'frontend developer',
                secondRole: '',
            }, {
                src: 'src/resources/devs/jdomingu.png',
                name: 'jdomingu',
                firstRole: 'ux/ui designer',
                secondRole: 'fullstack developer',
            }]
        };
    }

    developersToHTML() {
        return this.state.devsInfo.map( dev => 
            `
                <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                    <dev-card src="${dev.src}" devName="${dev.name}" firstRole="${dev.firstRole}" secondRole="${dev.secondRole}"></dev-card>
                </div>
            `).join('');
    }

    render() {
        return `
            <aside class="row" style="margin-top: 7rem;">
                <div class="col-12 d-flex flex-column justify-content-center align-items-center text-center">
                    <sub-header-text color="var(--app-secondary-color)">meet the team</sub-header-text>
                    <h2-text>the minds behind <br> the code</h2-text>
                </div>

                <div class="row d-flex px-0" > 
                    ${this.developersToHTML()}
                </div>
            </aside>
        `;
    }
});
