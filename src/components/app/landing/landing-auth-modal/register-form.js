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
            repeat_password: this._getDOM().querySelector('#signup-repeat-password').value.trim(),
        };
        return data;
    }

    cleanInputs() {
        const inputs = this._getDOM().querySelectorAll('input:not([type="submit"])');
        const errorMessages = this._getDOM().querySelectorAll('.error-message');
        errorMessages.forEach(error => error.classList.add('hidden'));
        inputs.forEach(input => input.classList.remove('input-error'));
    }

    markInputAsError(inputId, errorMessage, password) {
        const input = this._getDOM().getElementById(inputId);
        let message = this._getDOM().querySelector(`#${inputId} + .error-message`);

        if (password?.isPasswordField && password?.id === 'password')
            message = this._getDOM().querySelector(`#${password.id} + .error-message`);
        else if (password?.isPasswordField && password?.id === 'password_repeat')
            message = this._getDOM().querySelector(`#${password.id} + .error-message`);

        if (inputId !== 'checkbox-field')
            input.classList.add('input-error');

        message.textContent = this.translator.translate(errorMessage);
        message.classList.remove('hidden');
    }

    isFormDataValid(errorsFieldMap, formData) {
        const { username, email, password, repeat_password } = formData;
        let ok = true;

        if (!username || username.length < 3 || username.length > 20) {
            this.markInputAsError(errorsFieldMap.username,
                (!username || username.length === 0) ?
                    'ERROR.USERNAME.REQUIRED' : 'ERROR.USERNAME.LENGTH');
            ok = false;
        }
        if (!email || email.length === 0) {
            this.markInputAsError(errorsFieldMap.email, 'ERROR.EMAIL.REQUIRED');
            ok = false;
        }

        if (!password || password.length === 0) {
            this.markInputAsError(
                errorsFieldMap.password,
                'ERROR.PASSWORD.REQUIRED',
                {isPasswordField: true, id: 'password'}
            );
            ok = false;
        }

        if (!repeat_password || repeat_password.length === 0) {
            this.markInputAsError(
                errorsFieldMap.repeat_password,
                'ERROR.PASSWORD.REQUIRED_CONFIRM',
                {isPasswordField: true, id: 'password_repeat'}
            );
            ok = false;
        }

        if (!this._getDOM().querySelector('input[type="checkbox"]').checked) {
            this.markInputAsError('checkbox-field', 'ERROR.USER.CHECKBOX');
            ok = false;
        }

        return ok;
    }

    doRegistration() {
        const formData = this.getFormValues();

        const errorFieldsMap = {
            username: 'signup-username',
            email: 'signup-email',
            password: 'signup-password',
            repeat_password: 'signup-repeat-password',
        };
        if (!this.isFormDataValid(errorFieldsMap, formData))
            return;

        AuthService.register(formData).then( () => {
            SnackbarService.addToast({
                title: this.translator.translate('SNACKBAR.AUTH_MODAL.REGISTER.TITLE'),
                body: this.translator.translate('SNACKBAR.AUTH_MODAL.REGISTER.DESC')
            });
            this.emit('CLOSE_MODAL');
        }).catch( e => {
            this.cleanInputs();
            Object.keys(errorFieldsMap).forEach(key => e[key] && e[key].length > 0 &&
                this.markInputAsError(errorFieldsMap[key], e[key][0]));
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

        this.subscribe('input[type="checkbox"]', 'click', e => {
            e.stopPropagation();
            e.stopImmediatePropagation();
        });

        this.subscribe('#checkbox-field, .checkbox-label', 'click', () => {
            const checkbox = this._getDOM().querySelector('input[type="checkbox"]');
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
                    <h3>{{ translator.translate('LANDING.BUTTONS.SIGN_UP') }}</h3>
                    <div class="input-field">
                        <h4>{{ translator.translate('LANDING.FORMS.USERNAME') }}</h4>
                        <input type="text" id="signup-username" placeholder="JohnDoe" required>
                        <p class="error-message hidden"></p>
                    </div>
                    <div class="input-field">
                        <h4>{{ translator.translate('LANDING.FORMS.EMAIL') }}</h4>
                        <input type="email" id="signup-email" placeholder="johndoe@gmail.com" required>
                        <p class="error-message hidden"></p>
                    </div>
                    <div class="input-field">
                        <h4>{{ translator.translate('LANDING.FORMS.PASSWORD') }}</h4>
                        <div id="password" class="password-container">
                            <input type="password" id="signup-password" [placeholder]="translator.translate('LANDING.FORMS.PASSWORD_PHOLDER')" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message hidden"></p>
                    </div>
                    <div class="input-field">
                        <h4>{{ translator.translate('LANDING.FORMS.CONFIRM_PASSWORD') }}</h4>
                        <div id="password_repeat" class="password-container">
                            <input type="password" id="signup-repeat-password" [placeholder]="translator.translate('LANDING.FORMS.CONFIRM_PASSWORD_PHOLDER')" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message hidden"></p>
                    </div>
                    
                    <div id="checkbox-field" class="d-flex align-items-center pt-3 pb-2">
                        <input type="checkbox" id="terms" value="terms" required />
                        <p class="checkbox-label">${ this.translator.translate('LANDING.REGISTER.TERMS') }</p>
                    </div>
                    <p class="error-message hidden"></p>
                    <div class="signButtons">
                        <input type="submit" class="primary-btn me-3" [value]="translator.translate('LANDING.BUTTONS.REGISTER_NOW')">
                        <button class="signinBtn secondary-btn">{{ translator.translate('LANDING.BUTTONS.LOGIN') }}</button>
                    </div>
                    <p class="forgot text-center mt-2">{{ translator.translate('LANDING.REGISTER.OPTION_TEXT') }}</p>
                    <button class="primary-btn-alt">{{ translator.translate('LANDING.BUTTONS.42_ACCOUNT') }}</button>
                </form>
            </div>
            `;
    }
});