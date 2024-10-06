import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService.js';
import { SnackbarService } from '#services/SnackbarService';

import css from '../landing-auth-modal.css?inline';

export default Component ({
    tagName: 'forgot-password-form',
    styleCSS: css,
},
class ForgotPasswordForm extends WebComponent {

    sendRecoverEmail() {
        const usernameOrEmail = this._getDOM().querySelector('#forgot-email').value.trim();
        const errorMessageElement = this._getDOM().querySelector('.error-message');
        const input = errorMessageElement.previousElementSibling;

        AuthService.forgotPassword({username_or_email: usernameOrEmail})
            .then(() => {
                SnackbarService.addToast({title: 'Success', body: 'We have sent you an email with instructions',});
                this.emit('CLOSE_MODAL');
            })
            .catch(() => {
                input.classList.add('input-error');
                errorMessageElement.textContent = 'No user or email matches the given input';
                errorMessageElement.classList.remove('hidden');
            });
    }

    bind() {
        this.subscribe('.forgotSigninBtn', 'click', e => {
            e.preventDefault();
            this.emit('FORGOT_TO_LOGIN_CLICK');
        });

        this.subscribe('.closeModalBtn', 'click', () => this.emit('CLOSE_MODAL'));

        this.subscribe('.primary-btn', 'click', e => {
            e.preventDefault();
            this.sendRecoverEmail();
        });

        this.subscribe('#forgot-email', 'input', () => {
            this._getDOM().querySelector('.error-message').classList.add('hidden');
            this._getDOM().getElementById('forgot-email').classList.remove('input-error');
        });
    }

    render() {
        return `
            <div class="form forgotform" part="forgotform">
                <div class="icons-toolbar">
                    <i class='forgotSigninBtn bi bi-arrow-right' ></i>
                    <i class='closeModalBtn bi bi-x' ></i>
                </div>
                <form>
                    <h2>TRANSCENDENCE</h2>
                    <h3>Password assistance</h3>
                    <p class="intro">Enter your email or username and we'll send you instructions on how to reset your password.</p>
                    <div class="input-field" style="margin-bottom: 10px;">
                        <h4>Email or Username</h4>
                        <input type="text" id="forgot-email" placeholder="Identify yourself" required>
                        <p class="error-message hidden">Error message here</p>
                    </div>
                    <input type="submit" class="primary-btn" value="Send instructions">
                </form>
            </div>
            `;
    }
});