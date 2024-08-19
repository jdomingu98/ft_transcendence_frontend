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