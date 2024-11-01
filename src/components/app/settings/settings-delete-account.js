
import WebComponent, { Component } from '#WebComponent';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-delete-account',
    styleCSS: css
},
class SettingsDeleteAccount extends WebComponent {

    id = this.getAttribute('id');

    render() {
        return `
            <div class="my-5 row">
                <div id='${this.id}'>
                    <h2-text color="var(--app-secondary-color)">Delete Account</h2-text>
                </div>
                <div class="mt-3 mb-5 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">We strongly recommend you to activate the two-factor authenticacion method to protect your account even further.</p>
                    <p class="paragraph mb-4">By selecting or deselecting the checkbox, the change request will be applied instantly.</p>
                    <p class="paragraph mb-4">In case of activation, the email provided in the registration form will be used to send the security codes.</p>
                </div>
                <div>
                    <button class="primary-red-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">Delete account permanently</button>
                </div>
            </div>
        `;
    }
});