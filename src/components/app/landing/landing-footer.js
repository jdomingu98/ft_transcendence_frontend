import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'landing-footer'
},

class LandingFooter extends WebComponent {
    render() {
        return `
            <footer class="text-capitalize pt-5"
                    style="font-family: var(--app-secondary-text-font); font-size: 0.85rem; background-color: var(--app-primary-bg-color)"
            >
                <div class="col-12 d-flex justify-content-space-between align-items-center text-center text-white">
                    <span class="col-3">{{ translator.translate("LANDING.FOOTER.COPYRIGHT")}}</span>
                    <a href="/privacy-policy" target="_blank" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">{{ translator.translate("LANDING.FOOTER.PRIVACY_POLICY")}}</a>
                    <a href="/legal-notice" target="_blank" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">{{ translator.translate("LANDING.FOOTER.LEGAL_NOTICE")}}</a>
                    <a href="/terms-conditions" target="_blank" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">{{ translator.translate("LANDING.FOOTER.TERMS_CONDITIONS")}}</a>
                </div>
            </footer>
        `;
    }
});