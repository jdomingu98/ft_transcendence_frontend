import WebComponent, { Component } from '#WebComponent';

import css from './LegalDocs.css?inline';

export default Component ({
    tagName: 'terms-conditions',
    styleCSS: css
},

class TermsConditions extends WebComponent {

    bind() {
        //TODO: Hide navbar if its logged in (has token)
        const currentPath = window.location.pathname;
        if (currentPath === '/app/terms-conditions') {
            this.shadowRoot.querySelector('#navbar-terms-conditions').style.display = 'none';
        }

    }

    render() {
        return `
            <section class="position-relative container-fuild base">
                <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights middle-left-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights middle-right-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights bottom-light"></div>
                <div id="navbar-terms-conditions" class="w-100">
                    <landing-navbar></landing-navbar>
                </div>
                <div class="card base-card">
                    <div class="card-body text-white body p-5">
                        <h1-text>{{ translator.translate('TERMS_AND_CONDITIONS.TITLE') }}</h1-text>
                        <p>${ this.translator.translate('TERMS_AND_CONDITIONS.UPDATED') }</p>

                        <p>${ this.translator.translate('TERMS_AND_CONDITIONS.INTRO') }</p>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_1.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_1.INTRO') }}</p>
                        <ul>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_1.DATA.PICTURES') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_1.DATA.EMAIL') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_1.DATA.PASSWORD') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_1.DATA.USERNAME') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_1.DATA.CODE') }</li>
                        </ul>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_2.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_2.INTRO') }}</p>
                        <ul>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_2.DATA.PICTURES') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_2.DATA.EMAIL') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_2.DATA.PASSWORD') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_2.DATA.USERNAME') }</li>
                            <li>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_2.DATA.CODE') }</li>
                        </ul>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_3.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_3.CONTENT') }}</p>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_4.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_4.CONTENT') }}</p>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.INTRO') }}</p>
                        <ul>
                            <li>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.LIST.ELEMENT_1') }}</li>
                            <li>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.LIST.ELEMENT_2') }}</li>
                            <li>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.LIST.ELEMENT_3') }}</li>
                            <li>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.LIST.ELEMENT_4') }}</li>
                            <li>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.LIST.ELEMENT_5') }}</li>
                            <li>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_5.LIST.ELEMENT_6') }}</li>
                        </ul>
                        <p>${ this.translator.translate('TERMS_AND_CONDITIONS.SECTION_5.OUTRO') }</p>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_6.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_6.CONTENT') }}</p>

                        <h2>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_7.TITLE') }}</h2>
                        <p>{{ translator.translate('TERMS_AND_CONDITIONS.SECTION_7.CONTENT') }}</p>
                    </div>
                </div>
            </section>
            <div style="background-color: var(--app-primary-bg-color)">
                <landing-footer></landing-footer>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
});