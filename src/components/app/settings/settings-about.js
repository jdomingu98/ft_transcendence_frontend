
import WebComponent, { Component } from '#WebComponent';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-about',
    styleCSS: css
},
class SettingsAbout extends WebComponent {

    id = this.getAttribute('id');

    render() {
        return `
            <div class="mt-5 row">
                <div id='${this.id}'>
                    <h2-text color="var(--app-secondary-color)">About Transcendence</h2-text>
                </div>
                <div class="mt-3 mb-5 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">Please, feel free to check any document of this website.</p>
                    <p class="paragraph mb-4">It's important to you to read those because they explained what personal data are used and where, when and how are they managed.</p>
                    <p class="paragraph mb-4">You can see them by clicking the following links:</p>
                    <ul>
                        <li><a rel="noreferrer" href="#">Privacy Policy</a></li>
                        <li><a rel="noreferrer" href="#">Legal Advise</a></li>
                        <li><a rel="noreferrer" href="#">Terms and Conditions</a></li>
                    </ul>
                    <p class="paragraph mb-4">If after reading you still have doubts, feel free to send an email at the direction listed in the Privacy Policy section</p>
                </div>
            </div>
        `;
    }
});