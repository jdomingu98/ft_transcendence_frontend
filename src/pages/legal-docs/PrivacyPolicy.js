import WebComponent, { Component } from '#WebComponent';

import css from './LegalDocs.css?inline';

export default Component ({
    tagName: 'privacy-policy',
    styleCSS: css
},

class PrivacyPolicy extends WebComponent {

    init() {
        const currentPath = window.location.pathname;
        this.state = {
            shownNavbar: currentPath !== '/app/privacy-policy'
        };
    }

    render() {
        return `
            <section class="position-relative container-fuild base">
                ${this.state.shownNavbar ? `<div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights middle-left-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights middle-right-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights bottom-light"></div>
                <div class="w-100">
                    <landing-navbar></landing-navbar>
                </div>` : ''}
                <div class="card base-card">
                    <div class="card-body text-white body p-5">
                        <h1-text>{{ translator.translate('PRIVACY.TITLE') }}</h1-text>
                        <p>${ this.translator.translate('PRIVACY.UPDATED') }</p>

                        <p>${ this.translator.translate('PRIVACY.INTRO') }</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_1.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_1.CONTENT') }}</p>
                        <ul>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.ENTERPRISE') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.ADDRESS') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.EMAIL') }</li>
                        </ul>

                        <h2>{{ translator.translate('PRIVACY.SECTION_2.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_2.CONTENT') }}</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_3.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_3.CONTENT') }}</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_4.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_4.CONTENT') }}</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_5.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_5.CONTENT') }}</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_6.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_6.INTRO') }}</p>
                        <ul>
                            <li>${ this.translator.translate('PRIVACY.SECTION_6.ACCESS') }</li>
                            <li>${ this.translator.translate('PRIVACY.SECTION_6.RECTIFICATION') }</li>
                            <li>${ this.translator.translate('PRIVACY.SECTION_6.SUPPRESSION') }</li>
                            <li>${ this.translator.translate('PRIVACY.SECTION_6.LIMITATION') }</li>
                            <li>${ this.translator.translate('PRIVACY.SECTION_6.OPPOSITION') }</li>
                        </ul>
                        <p>{{ translator.translate('PRIVACY.SECTION_6.OUTRO') }}</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_7.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_7.CONTENT') }}</p>

                        <h2>{{ translator.translate('PRIVACY.SECTION_8.TITLE') }}</h2>
                        <p>{{ translator.translate('PRIVACY.SECTION_8.CONTENT') }}</p>
                        <ul>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.EMAIL') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.POSTAL_ADDRESS') }</li>
                        </ul>             
                    </div>
                </div>
            </section>
            ${this.state.shownNavbar ? `<div style="background-color: var(--app-primary-bg-color)">
                <landing-footer></landing-footer>
                <div id="footer-gradient" class="col-12"></div>
            </div>` : ''}
        `;
    }
});