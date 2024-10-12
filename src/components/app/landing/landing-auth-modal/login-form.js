import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService.js';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService';

import css from './landing-auth-modal.css?inline';

export default Component ({
    tagName: 'login-form',
    styleCSS: css,
},
class LoginForm extends WebComponent {

    doLogin() {
        const username = this._getDOM().querySelector('#sigin-username').value.trim();
        const password = this._getDOM().querySelector('#signin-password').value.trim();
        const errorMessageElement = this._getDOM().querySelector('.error-message');
        const input = this._getDOM().querySelectorAll('input:not([type="submit"])');

        AuthService.login({username, password}).then(response => {
            const two_factor = response.two_factor_enabled;
            if (two_factor) {
                this.emit('CLOSE_MODAL');
                SnackbarService.addToast({
                    title: 'OTP Requested',
                    body: 'We sent you an email with a code. Please check it out!'
                });
                this.emit('OPEN_OTP', username);
            } else {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                this.emit('CLOSE_MODAL');
                SnackbarService.addToast({title: 'Success', body: 'You have successfully logged in'});
                setTimeout(() => NavigatorService.goToHome(), 1000);
            }
        }).catch(() => {
            input.forEach(input => input.classList.add('input-error'));
            errorMessageElement.textContent = 'Invalid username or password';
            errorMessageElement.classList.remove('hidden');
        });
    }

    bind() {
        this.subscribe('.primary-btn', 'click', e => {
            e.preventDefault();
            this.doLogin();
        });

        this.subscribe('.primary-btn-alt', 'click', e => {
            e.preventDefault();
            window.location.href = import.meta.env.VITE_FT_API_URL;
        });

        this.subscribe('.signupBtn', 'click', e => {
            e.preventDefault();
            this.emit('ON_SIGNUP_CLICK');
        });

        this.subscribe('.forgotBtn', 'click', e => {
            e.preventDefault();
            this.emit('LOGIN_TO_FORGOT_CLICK');
        });

        this.subscribe('.closeModalBtn', 'click', () => this.emit('CLOSE_MODAL'));

        this.subscribe('.togglePassword', 'click', e => {
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

        this.subscribeAll('input:not([type="submit"])', 'input', e => {
            this._getDOM().querySelector('.error-message').classList.add('hidden');
            const input = e.target.closest('input');
            input.classList.remove('input-error');
        });
    }

    render() {
        return `
            <div class="form signinform" part="signinform">
                <div class="icons-toolbar" style="flex-direction: row-reverse;">
                    <i class='closeModalBtn bi bi-x' ></i>
                </div>
                <form>
                    <h2>TRANSCENDENCE</h2>
                    <h3>Sign In</h3>
                    <p class="error-message hidden"></p>
                    <div class="input-field">
                        <h4>Username</h4>
                        <input type="text" id="sigin-username" placeholder="JohnDoe" required>
                    </div>
                    <div class="input-field">
                        <h4>Password</h4>
                        <div class="password-container">
                            <input type="password" id="signin-password" placeholder="Your password" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                    </div>
                    <p class="forgotBtn forgot" style="padding: 10px; cursor:pointer; width:fit-content">Forgot Password?</p>
                    <div class="signButtons">
                        <input type="submit" class="primary-btn" style="margin-right: 10px;" value="Log In Now">
                        <button class="signupBtn secondary-btn">Register</button>
                    </div>
                    <p class="forgot text-center mt-3">- OR LOGIN WITH -</p>
                    <button class="primary-btn-alt">42 account</button>
                </form>
            </div>
            `;
    }
});