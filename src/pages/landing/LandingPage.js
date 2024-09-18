import '/src/components/app/landing';
import WebComponent, { Component } from '#WebComponent';
import css from './LandingPage.css?inline';


export default Component({
    tagName: 'landing-page',
    styleCSS: css
},

class LandingPage extends WebComponent {
    init() {
        this.state = {
            showRegister: false,
            showLogin: false
        };
    }

    closeModal() {
        this.setState({
            ...this.state,
            showRegister: false,
            showLogin: false
        });
    }

    handleModalEvents() {
        const modal = this._getDOM().querySelector('modal-card');
        if (modal) {
            this.subscribe('modal-card','CLOSE_MODAL', () => this.closeModal());
        }
    }

    openModal(state) {
        this.setState({...this.state, ...state});
        this.handleModalEvents();
    }

    bind() {
        this.subscribe('landing-bottom-info-section', 'OPEN_MODAL', () => this.openModal({showRegister: true}));
        this.subscribe('landing-call-to-action-card', 'OPEN_MODAL', () => this.openModal({showRegister: true}));
        this.subscribe('landing-navbar', 'OPEN_MODAL', () => this.openModal({showRegister: true}));
    }

    render() {
        return `
            ${this.state.showRegister ? '<modal-card id="modal-register"></modal-card>' : ''}
            <div
                class="text-white d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
                style="width: 100%; height: 100%; background-color: var(--app-primary-bg-color); font-family: var(--app-primary-text-font);"
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