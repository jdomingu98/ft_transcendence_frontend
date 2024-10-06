import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService.js';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService';

import css from '../landing-auth-modal.css?inline';

export default Component ({
    tagName: 'register-form',
    styleCSS: css,
},
class RegisterForm extends WebComponent {

    getFormValues() {
        const data = {
            username: this._getDOM().querySelector('#signup-username').value.trim(),
            email: this._getDOM().querySelector('#signup-email').value.trim(),
            password: this._getDOM().querySelector('#signup-password').value.trim(),
            confirm_password: this._getDOM().querySelector('#signup-confirm-pwd').value.trim(),
        };
        return data;
    }

    doRegistration() { //TODO: check error and .env connection
        const formData = this.getFormValues();
        const inputs = this._getDOM().querySelectorAll('input:not([type="submit"])');

        AuthService.register(formData).then(response => {
            localStorage.setItem('access_token', response.access_token);
            localStorage.setItem('refresh_token', response.refresh_token);
            this.emit('CLOSE_MODAL');
            SnackbarService.addToast({title: 'Success', body: 'You have successfully register. Redirecting, please wait a moment...'});
            setTimeout(() => NavigatorService.goToHome(), 1000);
        }).catch(() => {
        /*    inputs.forEach(input => input.classList.add('input-error'));
            errorMessageElement.textContent = 'Invalid username or password';
            errorMessageElement.classList.remove('hidden');
        */});
    }

    bind() {
        this.subscribe('.signinBtn', 'click', e => {
            e.preventDefault();
            this.emit('ON_SIGNIN_CLICK');
        });

        this.subscribe('.closeModalBtn', 'click', () => this.emit('CLOSE_MODAL'));

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

        this.subscribe('.primary-btn', 'click', e => {
            e.preventDefault();
            this.doRegistration();
        });

        this.subscribeAll('input:not([type="submit"])', 'input', e => { //TODO: change to adapt to this form
            this._getDOM().querySelector('.error-message').classList.add('hidden');
            const input = e.target.closest('input');
            input.classList.remove('input-error');
        });

        this.subscribe('.primary-btn-alt', 'click', e => {
            e.preventDefault();
            window.location.href = import.meta.env.VITE_FT_API_URL;
        });
    }

    render() {
        return `
            <div class="form signupform" part="signupform">
                <div class="icons-toolbar">
                    <i class='closeModalBtn bi bi-x' ></i>
                </div>
                <form>
                    <h2 part="h2-register">TRANSCENDENCE</h2>
                    <h3>Sign Up</h3>
                    <div class="input-field">
                        <h4>Username</h4>
                        <input type="text" id="signup-username" placeholder="JohnDoe" required>
                        <p class="error-message">Error message here</p>
                    </div>
                    <div class="input-field">
                        <h4>Email Address</h4>
                        <input type="email" id="signup-email" placeholder="johndoe@gmail.com" required>
                        <p class="error-message">Error message here</p>
                    </div>
                    <div class="input-field">
                        <h4>Password</h4>
                        <div class="password-container">
                            <input type="password" id="signup-password" placeholder="Your password" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message">Error message here</p>
                    </div>
                    <div class="input-field">
                        <h4>Confirm Password</h4>
                        <div class="password-container">
                            <input
                                type="password"
                                id="signup-confirm-pwd"
                                placeholder="Confirm your password"
                                required
                            >
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message">Error message here</p>
                    </div>
                    <div class="checkbox">
                        <input type="checkbox" id="terms" value="terms_checkbox" required />
                        <label for="terms">I agree to the terms and conditions</label>
                    </div>
                    <div class="signButtons">
                        <input type="submit" class="primary-btn" style="margin-right: 10px;" value="Register now">
                        <button class="signinBtn secondary-btn">Log In</button>
                    </div>
                    <p class="forgot text-center mt-2">- OR REGISTER WITH -</p>
                    <button class="primary-btn-alt">42 account</button>
                </form>
            </div>
            `;
    }
});