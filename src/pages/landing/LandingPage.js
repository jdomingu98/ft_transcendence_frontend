import '/src/components/app/landing';
import WebComponent, { Component } from '#WebComponent';
import css from './LandingPage.css?inline';


export default Component({
    tagName: 'landing-page',
    styleCSS: css
},

class LandingPage extends WebComponent {
    render() {
        return `
            <div
                class="text-white d-flex flex-column justify-content-center align-items-center position-relative overflow-hidden"
                style="width: 100%; height: 100%; background-color: var(--app-primary-bg-color); font-family: var(--app-primary-text-font);"
            >
                <div class="landing-container d-flex row">
                    <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                    <div class="col-12 p-0 position-absolute rounded-circle lights middle-light"></div>
                    <div class="col-12 p-0 position-absolute rounded-circle lights bottom-light"></div>

                    <landing-navbar class="col-12 p-0"></landing-navbar>

                    <section class="d-flex col-12 p-0 justify-content-evenly align-items-center my-5">
                        <div class="col-5">
                            <h1-text>{{ translator.translate('LANDING.PLAY.TITLE') }}</h1-text>
                            <div class="mt-3 col-7">
                                <body-text>{{ translator.translate('LANDING.PLAY.SUBTITLE') }}</body-text>
                            </div>
                            <div class="col col-11 d-flex mt-4 gap-3">
                                <primary-button w="255px" h="75px">{{ translator.translate("LANDING.BUTTONS.LOCAL_MODE") }}</primary-button>
                                <secondary-button w="255px" h="75px">{{ translator.translate("LANDING.BUTTONS.CREATE_TOURNAMENT") }}</secondary-button>
                            </div>
                        </div>
                        <img src="/src/resources/landing/laptop.webp" alt="Landing top info section laptop" class="col-6" style="width:551px; height:443px">
                    </section>

                    <section class="d-flex col-12 p-0 justify-content-evenly align-items-center my-5 gap-5">
                        <img loading="lazy" src="/src/resources/landing/mailbox.webp" alt="Landing middle info section mailbox" style="width: 565px; height: 508px">
                        <div class="col-5">
                            <sub-header-text color="var(--app-secondary-color)">{{ translator.translate('LANDING.DISCOVER.HEADER') }}</sub-header-text>
                            <h2-text>{{ translator.translate('LANDING.DISCOVER.TITLE') }}</h2-text>
                            <div class="my-4 col-8">
                                <body-text>{{ translator.translate('LANDING.DISCOVER.SUBTITLE') }}</body-text>
                            </div>
                            <primary-button w="346px" h="76px">${ this.translator.translate('LANDING.BUTTONS.DISCOVER') }</primary-button>
                        </div>
                    </section>

                    <section class="d-flex col-12 p-0 justify-content-evenly align-items-center my-5">
                        <div class="col-5">
                            <sub-header-text color="var(--app-secondary-color)">{{ translator.translate('LANDING.LEADER_BOARD.HEADER') }}</sub-header-text>
                            <h2-text>{{ translator.translate('LANDING.LEADER_BOARD.TITLE') }}</h2-text>
                            <div class="my-4 col-9">
                                <body-text>${ this.translator.translate('LANDING.LEADER_BOARD.SUBTITLE') }</body-text>
                            </div>
                            <primary-button w="345px" h="80px">{{ translator.translate("LANDING.BUTTONS.REGISTER_NOW") }}<primary-button>
                        </div>
                        <img loading="lazy" src="/src/resources/landing/mobile.webp" alt="Landing bottom info section mobile" class="col-6" style="width:450px; height:460px">
                    </section>

                    <landing-dev-cards></landing-dev-cards>

                    <section class="col d-flex text-center my-5" style="background: var(--app-landing-footer-gradient); border-radius: 30px;height: 30rem;">
                        <div class="card-body d-flex flex-column justify-content-center align-items-center gap-5">
                            <sub-header-text color="black">${ this.translator.translate('LANDING.GET_STARTED.HEADER') }</sub-header-text>
                            <h2-text>${ this.translator.translate('LANDING.GET_STARTED.TITLE') }</h2-text>
                            <primary-button color="black" w="260px" h="90px">{{ translator.translate('LANDING.BUTTONS.GET_STARTED') }}</primary-button>
                        </div>
                    </section>

                    <landing-footer></landing-footer>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});