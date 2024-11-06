import WebComponent, { Component, Router } from '#WebComponent';
import AuthService from '#services/AuthService';
import { SnackbarService } from '#services/SnackbarService';

import css from './ResetPassword.css?inline';

export default Component ({
    tagName: 'reset-password',
    styleCSS: css
},

class ResetPassword extends WebComponent {

    init() {
        this.state = {
            data: {
                new_password: '',
                repeat_new_password: '',
                change_password_token: Router.getQuery().token || ''
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
        AuthService.changeRequestPassword(this.state.data)
            .then(() => {
                SnackbarService.addToast({
                    title: this.translator.translate('SNACKBAR.SETTINGS.CHANGE_PASSWORD_DONE.TITLE'),
                    body: this.translator.translate('SNACKBAR.SETTINGS.CHANGE_PASSWORD_DONE.DESC')
                });
            })
            .catch( e => {
                this.cleanInputs();
                let input, errorMessage;
                if (e?.new_password || e?.error) {
                    errorMessage = this._getDOM().querySelector('#password + .error-message');
                    input = this._getDOM().querySelector('input[name="password-reset"]');
                    input.classList.add('input-error');
                    errorMessage.textContent = this.translator.translate(e?.new_password ? 'ERROR.PASSWORD.REQUIRED' : e?.error[0]);
                    errorMessage.classList.remove('hidden');
                }
                if (e?.repeat_new_password) {
                    errorMessage = this._getDOM().querySelector('#confirm-password + .error-message');
                    input = this._getDOM().querySelector('input[name="confirm-password-reset"]');
                    input.classList.add('input-error');
                    input.classList.remove('hidden');
                    errorMessage.textContent = this.translator.translate('ERROR.PASSWORD.REQUIRED_CONFIRM');
                    errorMessage.classList.remove('hidden');
                }
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

        this.subscribe('input[name="password-reset"]', 'input', e => {
            this.setState({ ...this.state, data: {...this.state.data, new_password: e.target.value.trim() } });
        });

        this.subscribe('input[name="confirm-password-reset"]', 'input', e => {
            this.setState({ ...this.state, data: {...this.state.data, repeat_new_password: e.target.value.trim() } });
        });

        this.subscribe('primary-button', 'click', () => this.updatePassword());
    }

    render() {
        return `
            <section class="reset-container">
                <div class="card rounded">
                    <div class="card-body d-flex flex-column mx-auto my-4">
                        <h1 class="fw-bolder my-4 text-white text-uppercase text-center title">Transcendence</h1>
                        <h2 class="fw-bold mb-4 text-center subtitle">
                            {{ translator.translate('SETTINGS.SECTIONS.CHANGE_PASSWORD') }}
                        </h2>
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
                        <primary-button w="100%" h="62px">
                            {{ translator.translate('SETTINGS.CHANGE_PASSWORD.SAVE') }}
                        </primary-button>
                    </div>
                </div>
            </section>
        `;
    }
});
