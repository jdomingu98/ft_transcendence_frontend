
import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService';
import { SnackbarService } from '#services/SnackbarService';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-change-password',
    styleCSS: css
},

class SettingsChangePassword extends WebComponent {

    sectionId = this.getAttribute('sectionId');

    init() {
        this.state = {
            new_password: '',
            repeat_new_password: '',
            change_password_token: localStorage.getItem('access_token')
        };
    }

    updatePassword() {
        AuthService.changePassword(this.state)
            .then(() => {
                SnackbarService.addToast({
                    title: this.translator.translate('Update password'),
                    body: this.translator.translate('Password has been updated successfully')
                });
            })
            .catch( e => {
                //errores random sobre campos
                console.log(e);
            });
    };

    bind() {
        this.subscribeAll('.togglePassword', 'click', e => {
            const input = e.target.closest('.password-container').querySelector('input');
            const icon = e.target.closest('.togglePassword').querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });

        this.subscribe('input[name="password-settings"]', 'input', e => {
            this.setState({ ...this.state, new_password: e.target.value });
        });

        this.subscribe('input[name="confirm-password-settings"]', 'input', e => {
            this.setState({ ...this.state, repeat_new_password: e.target.value });
        });

        this.subscribe('primary-button', 'click', () => this.updatePassword());
    }

    render() {
        return `
            <div class="my-5 row">
                <div id='${this.sectionId}'>
                    <h2-text color="var(--app-secondary-color)">Change Password</h2-text>
                </div>
                <div class="my-4">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">new Password</sub-header-text>
                    </div>
                    <div class="w-100 password-container">
                        <input type="password" class="p-3" name="password-settings" [placeholder]="translator.translate('LANDING.FORMS.PASSWORD_PHOLDER')" aria-label="Password input field">
                        <span class="togglePassword">
                            <i class='bi bi-eye'></i>
                        </span>
                    </div>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Confirm new password</sub-header-text>
                    </div>
                    <div class="w-100 password-container">
                        <input type="password" class="p-3" name="confirm-password-settings" [placeholder]="translator.translate('LANDING.FORMS.CONFIRM_PASSWORD_PHOLDER')" aria-label="Confirm password input field">
                        <span class="togglePassword">
                            <i class='bi bi-eye'></i>
                        </span>
                    </div>
                </div>
                <primary-button w="85%" h="62px">Update password</primary-button>
            </div>
        `;
    }
});