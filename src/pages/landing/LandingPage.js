import '/src/components/app/landing';
import WebComponent, { Component } from '#WebComponent';
import css from './LandingPage.css?inline';

export default Component ({
    tagName: 'landing-page',
    styleCSS: css
},
class LandingPage extends WebComponent {

    init() {
        this.state = {
            username: ''
        };
    }

    showModal(section) {
        const modal = this._getDOM().querySelector('landing-auth-modal');
        modal.openModal(section);
    }

    showOTPModal() {
        const otpModal = this._getDOM().querySelector('landing-otp-modal');
        otpModal.openModal();
    }

    bind() {
        this.subscribe('landing-navbar', 'OPEN_MODAL', () => this.showModal('LOGIN'));
        this.subscribe('landing-bottom-info-section', 'OPEN_MODAL', () => this.showModal('REGISTER'));
        this.subscribe('landing-call-to-action-card', 'OPEN_MODAL', () => this.showModal('REGISTER'));
        this.subscribe('landing-auth-modal', 'OPEN_OTP', username => {
            this.setState({ username });
            this.showOTPModal();
        });
    }

    render() {
        return `
            <landing-auth-modal></landing-auth-modal>
            <landing-otp-modal [username]='state.username'></landing-otp-modal>
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

                    <landing-bottom-info-section
                        [subHeader]="translator.translate('LANDING.LEADER_BOARD.HEADER')"
                        [title]="translator.translate('LANDING.LEADER_BOARD.TITLE')"
                        [desc]="translator.translate('LANDING.LEADER_BOARD.SUBTITLE')">
                    </landing-bottom-info-section>

                    <landing-dev-cards></landing-dev-cards>

                    <landing-call-to-action-card></landing-call-to-action-card>

                    <landing-footer></landing-footer>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});