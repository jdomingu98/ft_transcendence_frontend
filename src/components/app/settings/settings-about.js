
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
                    <h2-text color="var(--app-secondary-color)">
                        {{ translator.translate('SETTINGS.SECTIONS.ABOUT') }}
                    </h2-text>
                </div>
                <div class="my-4 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.ABOUT.FIRST_PARAGRAPH') }}
                    </p>
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.ABOUT.SECOND_PARAGRAPH') }}
                    </p>
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.ABOUT.THIRD_PARAGRAPH') }}
                    </p>
                    <ul class="mb-4">
                        <li>
                            <a class="paragraph mb-5" style="color: var(--app-blue-color)" rel="noreferrer" target="_blank" href="privacy-policy">
                                {{ translator.translate('PRIVACY.TITLE') }}
                            </a>
                        </li>
                        <li>
                            <a class="paragraph mb-5" style="color: var(--app-blue-color)" rel="noreferrer" target="_blank" href="legal-notice">
                                {{ translator.translate('NOTICE.TITLE') }}
                            </a>
                        </li>
                        <li>
                            <a class="paragraph mb-5" style="color: var(--app-blue-color)" rel="noreferrer" target="_blank" href="terms-conditions">
                                {{ translator.translate('TERMS_AND_CONDITIONS.TITLE') }}
                            </a>
                        </li>
                    </ul>
                    <p class="paragraph">
                        {{ translator.translate('SETTINGS.ABOUT.FOURTH_PARAGRAPH') }}
                    </p>
                </div>
            </div>
        `;
    }
});