"use strict";

import { Component, WebComponent } from '#WebComponent'

import { BigTitle, SmallTitle, SmallCard } from '#common';

export default Component ({
    tagName: 'landing-dev-cards'
},

class LandingDevCards extends WebComponent {
    init() {
        this.state = {
            devs: [{
                src: 'src/resources/devs/aruzafa-.jpg',
                name: 'ARUZAFA-',
                job: 'PROJECT MANAGER',
                desc: 'FULLSTACK DEVELOPER',
            }, {
                src: 'src/resources/devs/atrujill.jpg',
                name: 'ATRUJILL',
                job: 'BACKEND DEVELOPER',
                desc: '',
            }, {
                src: 'src/resources/devs/cmorales.jpg',
                name: 'CMORALES',
                job: 'FRONTEND DEVELOPER',
                desc: '',
            }, {
                src: 'src/resources/devs/jdomingu.png',
                name: 'JDOMINGU',
                job: 'UX/UI DESIGNER',
                desc: 'FULLSTACK DEVELOPER',
            }]
        };
    }

    developersToHTML() {
        return this.state.devs.map( dev => 
            `
                <div class="col-12 col-md-6 col-lg-3 d-flex px-0 my-5 justify-content-center">
                    <small-card src="${dev.src}" title="${dev.name}" text="${dev.job}" text2="${dev.desc}"></small-card>
                </div>
            `).join('');
    }

    render() {
        return `
            <section class="row justify-content-center align-items-center" style="margin-top: 8rem;">

                <div class="col-12  d-flex flex-column justify-content-center align-items-center text-center">
                    <small-title>MEET THE TEAM</small-title>
                    <big-title>The Minds Behind <br> The Code</big-title>
                </div>

                <!-- div-cards ?? -->
                <div class="row d-flex justify-content-center px-0" > 
                    ${this.developersToHTML()}
                </div>
    
            </section>
        `;
    }
});
