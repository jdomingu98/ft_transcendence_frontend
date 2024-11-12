
import WebComponent, { Component } from '#WebComponent';
import { SnackbarService } from '#services/SnackbarService';
import UserService from '#services/UserService';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-two-factor-auth',
    styleCSS: css
},
class SettingsTwoFactorAuth extends WebComponent {

    sectionId = this.getAttribute('sectionId');

    init() {
        this.state = {
            user: this.getMyData()
        };
    }

    getMyData() {
        UserService.getMyInfo().then( user => this.setState({...this.state, user }));
    }

    toggleTwoFactorAuth() {
        const formData = new FormData();
        formData.append('two_factor_enabled', !this.state.user.two_factor_enabled);

        UserService.patch(this.state.user.id, formData)
            .then(() => {
                this.setState({...this.state, user: { ...this.state.user, two_factor_enabled: !this.state.user.two_factor_enabled } });
                if (this.state.user.two_factor_enabled) {
                    SnackbarService.addToast({
                        title: this.translator.translate('SNACKBAR.SETTINGS.TWO_FACTOR_AUTH_ACTIVATION.TITLE'),
                        body: this.translator.translate('SNACKBAR.SETTINGS.TWO_FACTOR_AUTH_ACTIVATION.DESC')
                    });
                } else {
                    SnackbarService.addToast({
                        title: this.translator.translate('SNACKBAR.SETTINGS.TWO_FACTOR_AUTH_DEACTIVATION.TITLE'),
                        body: this.translator.translate('SNACKBAR.SETTINGS.TWO_FACTOR_AUTH_DEACTIVATION.DESC')
                    });
                }
            })
            .catch(() => {
                SnackbarService.addToast({
                    title: this.translator.translate('SNACKBAR.SETTINGS.TWO_FACTOR_AUTH_ERROR.TITLE'),
                    body: this.translator.translate('SNACKBAR.SETTINGS.TWO_FACTOR_AUTH_ERROR.DESC')
                });
            });
    }

    bind() {
        this.subscribe('button', 'click', () => this.toggleTwoFactorAuth());
    }

    render() {
        return `
            <div class="my-5 row">
                <div id='${this.sectionId}'>
                    <h2-text color="var(--app-secondary-color)">
                        {{ translator.translate('SETTINGS.SECTIONS.TWO_FACTOR_AUTH') }}
                    </h2-text>
                </div>
                <div class="my-4 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.TWO_FACTOR_AUTH.FIRST_PARAGRAPH') }}
                    </p>
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.TWO_FACTOR_AUTH.SECOND_PARAGRAPH') }}
                    </p>
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.TWO_FACTOR_AUTH.THIRD_PARAGRAPH') }}
                    </p>
                </div>
                <div>
                    ${ this.state.user.two_factor_enabled ? `
                        <button class="primary-red-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">
                            {{ translator.translate('SETTINGS.TWO_FACTOR_AUTH.DEACTIVATE') }}
                        </button>` : `
                        <button class="primary-green-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">
                            {{ translator.translate('SETTINGS.TWO_FACTOR_AUTH.ACTIVATE') }}
                        </button>` }
                </div>
            </div>
        `;
    }
});