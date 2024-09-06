import WebComponent, { Component } from '#WebComponent';

import css from './LegalDocs.css?inline';

export default Component ({
    tagName: 'legal-notice',
    styleCSS: css
},

class LegalNotice extends WebComponent {

    init() {
        const currentPath = window.location.pathname;
        this.state = {
            shownNavbar: currentPath !== '/app/legal-notice'
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
                        <h1-text>{{ translator.translate('NOTICE.TITLE') }}</h1-text>
                        <p>${ this.translator.translate('NOTICE.UPDATED') }</p>

                        <p>${ this.translator.translate('NOTICE.INTRO') }</p>

                        <h2>{{ translator.translate('NOTICE.SECTION_1_TITLE') }}</h2>
                        <ul>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.ENTERPRISE') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.NIF') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.ADDRESS') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.EMAIL') }</li>
                            <li>${ this.translator.translate('LEGAL_COMMON_DATA.TELEPHONE') }</li>
                        </ul>

                        <h2>{{ translator.translate('NOTICE.SECTION_2.TITLE') }}</h2>
                        <p>{{ translator.translate('NOTICE.SECTION_2.CONTENT') }}</p>

                        <h2>{{ translator.translate('NOTICE.SECTION_3.TITLE') }}</h2>
                        <p>{{ translator.translate('NOTICE.SECTION_3.FIRST_PART') }}</p>
                        <p>{{ translator.translate('NOTICE.SECTION_3.SECOND_PART') }}</p>

                        <h2>{{ translator.translate('NOTICE.SECTION_4.TITLE') }}</h2>
                        <p>{{ translator.translate('NOTICE.SECTION_4.INTRO') }}</p>
                        <p>{{ translator.translate('NOTICE.SECTION_4.CONTENT.FIRST_PART') }}</p>
                        <ul>
                            <li>{{ translator.translate('NOTICE.SECTION_4.CONTENT.REASON_1') }}</li>
                            <li>{{ translator.translate('NOTICE.SECTION_4.CONTENT.REASON_2') }}</li>
                            <li>{{ translator.translate('NOTICE.SECTION_4.CONTENT.REASON_3') }}.</li>
                        </ul>

                        <h2>{{ translator.translate('NOTICE.SECTION_5.TITLE') }}</h2>
                        <p>{{ translator.translate('NOTICE.SECTION_5.CONTENT') }}</p>

                        <h2>{{ translator.translate('NOTICE.SECTION_6.TITLE') }}</h2>
                        <p>{{ translator.translate('NOTICE.SECTION_6.FIRST_PART') }}</p>
                        <p>{{ translator.translate('NOTICE.SECTION_6.SECOND_PART') }}</p>

                        <h2>{{ translator.translate('NOTICE.SECTION_7.TITLE') }}</h2>
                        <p>{{ translator.translate('NOTICE.SECTION_7.CONTENT') }}</p>

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