import '/src/components/app/landing';
import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';
import css from './LandingPage.css?inline';

document.querySelector('meta[name="description"]').content =
    `Discover our landing page, where you can register, discover features, and explore the leaderboard.
    Join us and start your journey!`;

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
        this.subscribe('#game-modes primary-button', 'click', () => NavigatorService.goToGame());
        this.subscribe('#game-modes secondary-button', 'click', () => NavigatorService.goToTournament());
        this.subscribe('#meet-people', 'click', () => this.showModal('REGISTER'));
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

                    <section class="d-flex col-12 p-0 justify-content-evenly align-items-center my-5" style="z-index:1;">
                        <div class="col-5">
                            <h1-text>{{ translator.translate('LANDING.PLAY.TITLE') }}</h1-text>
                            <div class="mt-3 col-7">
                                <p class="landing-body-text">{{ translator.translate('LANDING.PLAY.SUBTITLE') }}</p>
                            </div>
                            <div id="game-modes" class="col col-11 d-flex mt-4 gap-3">
                                <primary-button w="255px" h="75px">{{ translator.translate("LANDING.BUTTONS.LOCAL_MODE") }}</primary-button>
                                <secondary-button w="255px" h="75px">{{ translator.translate("LANDING.BUTTONS.CREATE_TOURNAMENT") }}</secondary-button>
                            </div>
                        </div>
                        <img src="/resources/landing/laptop.webp" alt="Landing top info section laptop" class="col-6" style="width:551px; height:443px">
                    </section>

                    <section class="d-flex col-12 p-0 justify-content-evenly align-items-center my-5 gap-5" style="z-index:1;">
                        <img loading="lazy" src="/resources/landing/mailbox.webp" alt="Landing middle info section mailbox" style="width: 565px; height: 508px">
                        <div class="col-5">
                            <sub-header-text color="var(--app-secondary-color)">{{ translator.translate('LANDING.DISCOVER.HEADER') }}</sub-header-text>
                            <h2-text>{{ translator.translate('LANDING.DISCOVER.TITLE') }}</h2-text>
                            <div class="my-4 col-8">
                                <p class="landing-body-text">{{ translator.translate('LANDING.DISCOVER.SUBTITLE') }}</p>
                            </div>
                            <primary-button id="meet-people" w="346px" h="76px">${ this.translator.translate('LANDING.BUTTONS.DISCOVER') }</primary-button>
                        </div>
                    </section>

                    <section class="d-flex col-12 p-0 justify-content-evenly align-items-center my-5" style="z-index:1;">
                        <div class="col-5">
                            <sub-header-text color="var(--app-secondary-color)">{{ translator.translate('LANDING.LEADER_BOARD.HEADER') }}</sub-header-text>
                            <h2-text>{{ translator.translate('LANDING.LEADER_BOARD.TITLE') }}</h2-text>
                            <div class="my-4 col-9">
                                <p class="landing-body-text">${ this.translator.translate('LANDING.LEADER_BOARD.SUBTITLE') }</p>
                            </div>
                            <primary-button id="landing-register-modal" w="345px" h="80px">{{ translator.translate("LANDING.BUTTONS.REGISTER_NOW") }}<primary-button>
                        </div>
                        <img loading="lazy" src="/resources/landing/mobile.webp" alt="Landing bottom info section mobile" class="col-6" style="width:450px; height:460px">
                    </section>

                    <landing-dev-cards></landing-dev-cards>

                    <section class="col d-flex text-center my-5" style="background: var(--app-landing-footer-gradient); border-radius: 30px; height: 30rem;" style="z-index:1;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                            <sub-header-text color="black">${ this.translator.translate('LANDING.GET_STARTED.HEADER') }</sub-header-text>
                            <h2-text>${ this.translator.translate('LANDING.GET_STARTED.TITLE') }</h2-text>
                            <primary-button id="call-action-register-modal" color="black" w="260px" h="90px">{{ translator.translate('LANDING.BUTTONS.GET_STARTED') }}</primary-button>
                        </div>
                    </section>

                    <landing-footer></landing-footer>
                </div>
                <div class="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});