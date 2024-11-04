
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
            data: {
                new_password: '',
                repeat_new_password: '',
                change_password_token: localStorage.getItem('access_token')
            }
        };
    }

    cleanInputs() {
        const inputs = this._getDOM().querySelectorAll('input[type="password"]');
        const errorMessages = this._getDOM().querySelectorAll('.error-message');
        errorMessages.forEach(error => error.classList.add('hidden'));
        inputs.forEach(input => input.classList.remove('input-error'));
    }

    updatePassword() {
        AuthService.changePassword(this.state.data)
            .then(() => {
                SnackbarService.addToast({
                    title: this.translator.translate('Update password'),
                    body: this.translator.translate('Password has been updated successfully')
                });
            })
            .catch( e => {
                console.log(e);
                this.cleanInputs();
                let input;
                if (e.password) {
                    input = this._getDOM().querySelector('input[name="password-settings"]');
                    this._getDOM().querySelector('#password + .error-message').textContent = this.translator.translate(e.password);
                } else {
                    input = this._getDOM().querySelector('input[name="confirm-password-settings"]');
                    this._getDOM().querySelector('#confirm-password + .error-message').textContent = this.translator.translate(e.confirm_password);
                }
                input.classList.add('input-error');
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

        this.subscribeAll('input[type="password"]', 'input', () => this.cleanInputs());

        this.subscribe('input[name="password-settings"]', 'input', e => {
            this.setState({ ...this.state, data: {...this.state.data, new_password: e.target.value } });
        });

        this.subscribe('input[name="confirm-password-settings"]', 'input', e => {
            this.setState({ ...this.state, data: {...this.state.data, repeat_new_password: e.target.value } });
        });

        this.subscribe('primary-button', 'click', () => this.updatePassword());
    }

    render() {
        return `
            <div class="my-5 row">
                <div id='${this.sectionId}'>
                    <h2-text color="var(--app-secondary-color)">
                        {{ translator.translate('SETTINGS.SECTIONS.CHANGE_PASSWORD') }}
                    </h2-text>
                </div>
                <div class="my-4">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('SETTINGS.CHANGE_PASSWORD.NEW_PASSWORD') }}
                        </sub-header-text>
                    </div>
                    <div id="password" class="w-100 password-container">
                        <input type="password" class="p-3" name="password-settings" [placeholder]="translator.translate('SETTINGS.CHANGE_PASSWORD.NEW_PASSWORD_PHOLDER')" aria-label="Password input field">
                        <span class="togglePassword">
                            <i class='bi bi-eye'></i>
                        </span>
                    </div>
                    <p class="error-message hidden"></p>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">
                            {{ translator.translate('SETTINGS.CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD') }}
                        </sub-header-text>
                    </div>
                    <div id="confirm-password" class="w-100 password-container">
                        <input type="password" class="p-3" name="confirm-password-settings" [placeholder]="translator.translate('SETTINGS.CHANGE_PASSWORD.CONFIRM_NEW_PASSWORD_PHOLDER')" aria-label="Confirm password input field">
                        <span class="togglePassword">
                            <i class='bi bi-eye'></i>
                        </span>
                    </div>
                    <p class="error-message hidden"></p>
                </div>
                <primary-button w="85%" h="62px">
                    {{ translator.translate('SETTINGS.CHANGE_PASSWORD.SAVE') }}
                </primary-button>
            </div>
        `;
    }
});