import '/src/components/app/landing';
import WebComponent, { Component } from '#WebComponent';
import css from './LandingPage.css?inline';

export default Component ({
    tagName: 'landing-page',
    styleCSS: css
},
class LandingPage extends WebComponent {

    showModal(section) {
        const modal = this._getDOM().querySelector('landing-auth-modal');
        modal.openModal(section);
    }

    showOTPModal(username) {
        const otpModal = this._getDOM().querySelector('landing-otp-modal');
        otpModal.openModal(username);
    }

    bind() {
        this.subscribe('landing-navbar', 'OPEN_MODAL', () => this.showModal('LOGIN'));
        this.subscribe('#landing-register-modal', 'click', () => this.showModal('REGISTER'));
        this.subscribe('#call-action-register-modal', 'click', () => this.showModal('REGISTER'));
        this.subscribe('landing-auth-modal', 'OPEN_OTP', ({detail}) => this.showOTPModal(detail));
    }

    render() {
        return `
            <landing-auth-modal></landing-auth-modal>
            <landing-otp-modal></landing-otp-modal>
            <div
                class="w-100 h-100 text-white d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
                style="background-color: var(--app-primary-bg-color); font-family: var(--app-primary-text-font);"
            >
                <div class="landing-container d-flex row">
                    <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                    <div class="col-12 p-0 position-absolute rounded-circle lights middle-light"></div>
                    <div class="col-12 p-0 position-absolute rounded-circle lights bottom-light"></div>

                    <landing-navbar class="col-12 p-0"></landing-navbar>

                    <landing-top-info-section
                        class="col-12 p-0"
                        [title]="translator.translate('LANDING.PLAY.TITLE')"
                        [desc]="translator.translate('LANDING.PLAY.SUBTITLE')">
                    </landing-top-info-section>

                    <landing-middle-info-section
                        [subHeader]="translator.translate('LANDING.DISCOVER.HEADER')"
                        [title]="translator.translate('LANDING.DISCOVER.TITLE')"
                        [desc]="translator.translate('LANDING.DISCOVER.SUBTITLE')">
                    </landing-middle-info-section>

                    <section class="d-flex col align-items-center my-5 gap-5">
                        <div class="col col-6">
                            <sub-header-text color="var(--app-secondary-color)">{{ translator.translate('LANDING.LEADER_BOARD.HEADER') }}</sub-header-text>
                            <h2-text>{{ translator.translate('LANDING.LEADER_BOARD.TITLE') }}</h2-text>
                            <div class="my-4 col-9">
                                <body-text>${ this.translator.translate('LANDING.LEADER_BOARD.SUBTITLE') }</body-text>
                            </div>
                            <primary-button id="landing-register-modal" w="345px" h="80px">{{ translator.translate("LANDING.BUTTONS.REGISTER_NOW") }}<primary-button>
                        </div>
                        <landing-mobile></landing-mobile>
                    </section>

                    <landing-dev-cards></landing-dev-cards>

                    <section class="col d-flex text-center my-5" style="background: var(--app-landing-footer-gradient); border-radius: 30px; height: 30rem;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                            <sub-header-text color="black">${ this.translator.translate('LANDING.GET_STARTED.HEADER') }</sub-header-text>
                            <h2-text>${ this.translator.translate('LANDING.GET_STARTED.TITLE') }</h2-text>
                            <primary-button id="call-action-register-modal" color="black" w="260px" h="90px">{{ translator.translate('LANDING.BUTTONS.GET_STARTED') }}</primary-button>
                        </div>
                    </section>

                    <landing-footer></landing-footer>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});