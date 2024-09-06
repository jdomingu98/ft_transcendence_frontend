import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'landing-footer'
},

class LandingFooter extends WebComponent {
    render() {
        return `
            <footer class="text-capitalize mt-5"
                    style="font-family: var(--app-secondary-text-font);font-size: 14px;"
            >
                <div class="col-12 d-flex justify-content-space-between align-items-center text-center text-white">
                    <span class="col-3">{{ translator.translate("LANDING.FOOTER.COPYRIGHT")}}</span>
                    <router-link href="/privacy-policy" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">{{ translator.translate("LANDING.FOOTER.PRIVACY_POLICY")}}</router-link>
                    <router-link href="/legal-notice" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">{{ translator.translate("LANDING.FOOTER.LEGAL_NOTICE")}}</router-link>
                    <router-link href="/terms-conditions" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">{{ translator.translate("LANDING.FOOTER.TERMS_CONDITIONS")}}</router-link>
                </div>
            </footer>
        `;
    }
});