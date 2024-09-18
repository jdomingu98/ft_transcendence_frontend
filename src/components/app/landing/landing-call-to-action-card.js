import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'landing-call-to-action-card'
},

class LandingCallToActionCard extends WebComponent {

    bind() {
        this.subscribe('#call-action-register-modal', 'click', () => this.emit('OPEN_MODAL'));
    }

    render() {
        return `
            <section
                class="col d-flex text-center my-5"
                style="background: var(--app-landing-footer-gradient); border-radius: 30px;height: 30rem;"
            >
                <div class="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                    <sub-header-text color="black">${ this.translator.translate('LANDING.GET_STARTED.HEADER') }</sub-header-text>
                    <h2-text>${ this.translator.translate('LANDING.GET_STARTED.TITLE') }</h2-text>
                    <primary-button id="call-action-register-modal" color="black" w="260px" h="90px">{{ translator.translate('LANDING.BUTTONS.GET_STARTED') }}</primary-button>
                </div>
            </section>
        `;
    }
});