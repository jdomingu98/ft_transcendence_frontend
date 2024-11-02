
import WebComponent, { Component } from '#WebComponent';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-about',
    styleCSS: css
},
class SettingsAbout extends WebComponent {

    sectionId = this.getAttribute('sectionId');

    render() {
        return `
            <div class="my-5 row">
                <div id='${this.sectionId}'>
                    <h2-text color="var(--app-secondary-color)">About Transcendence</h2-text>
                </div>
                <div class="my-4 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">Please, feel free to check any document of this website.</p>
                    <p class="paragraph mb-4">It's important to you to read those because they explained what personal data are used and where, when and how are they managed.</p>
                    <p class="paragraph mb-4">You can see them by clicking the following links:</p>
                    <ul class="mb-4">
                        <li><a class="paragraph mb-5" style="color: var(--app-blue-color)" rel="noreferrer" target="_blank" href="privacy-policy">Privacy Policy</a></li>
                        <li><a class="paragraph mb-5" style="color: var(--app-blue-color)" rel="noreferrer" target="_blank" href="legal-notice">Legal Notice</a></li>
                        <li><a class="paragraph mb-5" style="color: var(--app-blue-color)" rel="noreferrer" target="_blank" href="terms-conditions">Terms and Conditions</a></li>
                    </ul>
                    <p class="paragraph">If after reading you still have doubts, feel free to send an email at the direction listed in the Privacy Policy section</p>
                </div>
            </div>
        `;
    }
});