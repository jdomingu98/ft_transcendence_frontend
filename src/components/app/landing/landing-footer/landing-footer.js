"use strict";

import { Component, WebComponent } from '#WebComponent';

import css from './landing-footer.css?inline';

export default Component ({
    tagName: 'landing-footer',
    styleCSS: css
},

class LandingFooter extends WebComponent {
    render() {
        return `
            <footer id="footer-text">
                <div class="col-12 d-flex justify-content-space-between align-items-center text-center">
                    <span class="col-3 footer-text">© Copyright 2024. All rights reserved</span>
                    <a href="/legal-notice" rel="noreferrer" class="col-3 links footer-text">Legal Notice</a>
                    <a href="/privacy" rel="noreferrer" class="col-3 links footer-text">Privacy Policy</a>
                    <a href="/cookies" rel="noreferrer" class="col-3 links footer-text">Cookie Policy</a>
                </div>
            </footer>
        `;
    }
});