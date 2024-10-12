import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService';

import css from './landing-auth-modal.css?inline';

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
            repeat_password: this._getDOM().querySelector('#signup-repeat_password').value.trim(),
        };
        return data;
    }

    cleanInputs() {
        const inputs = this._getDOM().querySelectorAll('input:not([type="submit"])');
        const errorMessages = this._getDOM().querySelectorAll('.error-message');
        errorMessages.forEach(error => error.classList.add('hidden'));
        inputs.forEach(input => input.classList.remove('input-error'));
    }

    doRegistration() {
        const formData = this.getFormValues();

        const errorFieldsMap = {
            username: 'signup-username',
            email: 'signup-email',
            password: 'signup-password',
            repeat_password: 'signup-repeat_password',
        };

        AuthService.register(formData).then( () => {
            SnackbarService.addToast({ title: 'Welcome!', body: 'We have sent you an email to verify your account' });
            this.emit('CLOSE_MODAL');
        }).catch( e => {
            this.cleanInputs();

            Object.keys(errorFieldsMap).forEach(key => {
                if (e[key] && e[key].length > 0) {
                    const input = this._getDOM().querySelector(`#${errorFieldsMap[key]}`);
                    let errorMessage = this._getDOM().querySelector(`#${errorFieldsMap[key]} + .error-message`);

                    if (key === 'password' || key === 'repeat_password')
                        errorMessage = this._getDOM().querySelector('.password-container + .error-message');

                    input.classList.add('input-error');
                    errorMessage.textContent = e[key][0];
                    errorMessage.classList.remove('hidden');
                }
            });
        });
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

        this.subscribe('#checkbox-field', 'click', () => {
            const checkbox = this._getDOM().querySelector('#terms');
            checkbox.checked = !checkbox.checked;
        });

        this.subscribe('.primary-btn', 'click', e => {
            e.preventDefault();
            this.doRegistration();
        });

        this.subscribeAll('input:not([type="submit"])', 'input', () => this.cleanInputs());

        this.subscribe('.primary-btn-alt', 'click', e => {
            e.preventDefault();
            NavigatorService.goTo42LoginPage();
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
                        <p class="error-message hidden"></p>
                    </div>
                    <div class="input-field">
                        <h4>Email Address</h4>
                        <input type="email" id="signup-email" placeholder="johndoe@gmail.com" required>
                        <p class="error-message hidden"></p>
                    </div>
                    <div class="input-field">
                        <h4>Password</h4>
                        <div class="password-container">
                            <input type="password" id="signup-password" placeholder="Your password" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message hidden"></p>
                    </div>
                    <div class="input-field">
                        <h4>Confirm Password</h4>
                        <div class="password-container">
                            <input type="password" id="signup-repeat_password" placeholder="Confirm your password" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message hidden"></p>
                    </div>
                    <div id="checkbox-field" class="d-flex align-items-center py-3">
                        <input type="checkbox" id="terms" required />
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