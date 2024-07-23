import { Component, WebComponent } from '#WebComponent';


export default Component ({
    tagName: 'landing-footer'
},

class LandingFooter extends WebComponent {
    render() {
        return `
            <footer class="text-capitalize mt-5"
                    style="font-family: var(--app-secondary-text-font);font-size: 14px;"
            >
                <div class="col-12 d-flex justify-content-space-between align-items-center text-center">
                    <span class="col-3">© Copyright 2024. All rights reserved</span>
                    <a href="/legal-notice" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">Legal Notice</a>
                    <a href="/privacy" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">Privacy Policy</a>
                    <a href="/cookies" rel="noreferrer" class="col-3 link-light link-underline-opacity-0">Cookie Policy</a>
                </div>
            </footer>
        `;
    }
});