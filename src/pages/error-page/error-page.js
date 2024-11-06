import WebComponent, { Component, Router } from '#WebComponent';
import NavigatorService from '#services/NavigatorService.js';

export default Component ({
    tagName: 'error-page',
    styleCSS: `
        .error-container {
            height: 100vh;
            background-color: var(--app-primary-bg-color);
            font-family: var(--app-primary-text-font);
        }

        .lights {
            width: 680px;
            height: 680px;
            filter: blur(306px);
            z-index: 0;
        }

        .top-light {
            top: -330px;
            left: 55px;
            background-color: var(--app-primary-color);
        }

        .middle-light {
            top: 540px;
            left: 1140px;
            background: var(--app-secondary-color);
        }

        #footer-gradient {
            background: var(--app-landing-footer-gradient);
            width: 100%;
            height: 10px;
            margin-top: 1rem;
        }

        .icons {
            cursor: pointer;
            font-size: 20px;
        }

        .icons::before {
            font-weight: 600 !important;
        }
    `
},
class ErrorPage extends WebComponent {
    init() {
        this.state = {
            message: Router.state?.message ?? 'ERROR.PAGE.DESCRIPTION',
        };
    }

    bind() {
        this.subscribe('#back-button', 'click', () => Router.goBack());
        this.subscribe('#home-button', 'click', () => NavigatorService.goToHome());
    }

    render() {
        return `
            <div class="error-container position-relative overflow-hidden w-100 d-flex align-items-end">
                <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights middle-light"></div>
                <div class="card position-absolute top-50 start-50 translate-middle" style="width: 18rem;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between pb-4">
                            <i id="back-button" class="icons bi-arrow-left p-2"></i>
                            <i id="home-button" class="icons bi-house p-2"></i>
                        </div>
                        <h5 class="card-title">{{ translator.translate("ERROR.PAGE.TITLE") }}</h5>
                        <p class="card-text">{{ translator.translate(state.message) }}</p>
                        <app-spinner></app-spinner>
                    </div>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});