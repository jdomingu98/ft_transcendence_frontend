
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
                        title: this.translator.translate('2FA has been activated'),
                        body: this.translator.translate('One-time passwords will be sent to your email')
                    });
                } else {
                    SnackbarService.addToast({
                        title: this.translator.translate('2FA has been deactivated'),
                        body: this.translator.translate('You should activate it for security reasons')
                    });
                }
            })
            .catch(() => {
                SnackbarService.addToast({
                    title: this.translator.translate('Error al enivar la solicitud'),
                    body: this.translator.translate('Por favor, inténtalo más tarde')
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
                    <h2-text color="var(--app-secondary-color)">Two-factor authentication</h2-text>
                </div>
                <div class="my-4 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">We strongly recommend you to activate the two-factor authenticacion method to protect your account even further.</p>
                    <p class="paragraph mb-4">By selecting or deselecting the checkbox, the change request will be applied instantly.</p>
                    <p class="paragraph mb-4">In case of activation, the email provided in the registration form will be used to send the security codes.</p>
                </div>
                <div>
                    ${ this.state.user.two_factor_enabled ? '<button class="primary-red-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">Deactivate Two-Factor Authentication</button>' : '<button class="primary-green-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">Activate Two-Factor Authentication</button>'}
                </div>
            </div>
        `;
    }
});