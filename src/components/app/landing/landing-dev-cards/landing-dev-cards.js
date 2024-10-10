import WebComponent, { Component } from '#WebComponent';
import { DEFAULT_IMG_DIMENSION } from '/src/const/index.js';

import css from './landing-dev-cards.css?inline';

export default Component ({
    tagName: 'landing-dev-cards',
    styleCSS: css
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
                <div class="col d-flex px-0 my-5 justify-content-center">
                    <div class="card mt-4 border-0 card-content text-uppercase">
                        <div class="mx-auto rounded-circle profile" style="width:${DEFAULT_IMG_DIMENSION}; height:${ DEFAULT_IMG_DIMENSION}; background-image: url(${dev.src})"></div>
                        <div class="card-body">
                            <p class="dev-name fw-bolder mb-4 text-center" style="color: var(--app-secondary-color)">${dev.name}</p>
                            <div class="d-flex row justify-content-center align-items-center" style="height: 90%;">
                                <p class="text-center fw-medium px-2 text-white role">${dev.firstRole}</p>
                                ${dev.secondRole ? `<p class="text-center fw-medium px-2 text-white role">${dev.secondRole}</p>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    render() {
        return `
            <aside class="my-5">
                <div class="col-12 d-flex flex-column justify-content-center align-items-center text-center">
                    <sub-header-text color="var(--app-secondary-color)">
                    {{ translator.translate('LANDING.TEAM.HEADER') }}
                    </sub-header-text>
                    <h2-text>
                    ${ this.translator.translate('LANDING.TEAM.TITLE') }
                    </h2-text>
                </div>

                <div class="col-12 d-flex"> 
                    ${this.developersToHTML()}
                </div>
            </aside>
        `;
    }
});
