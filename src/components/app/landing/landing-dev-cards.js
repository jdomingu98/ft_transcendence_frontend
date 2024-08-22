import WebComponent, { Component } from '#WebComponent';


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
