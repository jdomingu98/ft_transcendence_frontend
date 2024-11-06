import WebComponent, { Component } from '#WebComponent';
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
            <section class="container-fluid parent">
                <div class="col card d-flex text-center">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center mb-4">
                        <h1 class="fw-bold my-3 text-white text-uppercase">Transcendence</h1>
                        <h2 class="fw-bold mb-5" style="color: var(--app-secondary-color);">Change password</h2>
                        <form class="d-flex flex-column mt-4">
                            <div class="form-group">
                                <label for="new-password">New Password</label>
                                <input type="password" id="new-password" name="password-reset">
                            </div>
                            <div class="form-group mb-3" style="margin-top:5rem;">
                                <label for="repeat-password">Confirm new Password</label>
                                <input type="password" id="repeat-password" name="confirm-password-reset">
                            </div>
                            <primary-button w="359px" h="70px" className="my-4">Update password</primary-button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
});
