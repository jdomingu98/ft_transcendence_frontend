import '/src/components/app/landing';
import { EMAIL_REGEX, PASSWORD_RREGEX, USERNAME_REGEX } from '#const';
import WebComponent, { Component } from '#WebComponent';
/*import NavigatorService from '#services/NavigatorService.js';
import { SnackbarService } from '#services/SnackbarService';*/
import css from './register-section.css?inline';

export default Component({
    tagName: 'register-section',
    styleCSS: css,
},

class RegisterSection extends WebComponent {

    init() {
        this.state = {
            isFetching: false,
            errors: {},
            longMsg: false,
        };
    }

    storeFormData(){
        const data = {
            username: this._getDOM().querySelector('#username').value.trim(),
            email: this._getDOM().querySelector('#email').value.trim(),
            password: this._getDOM().querySelector('#password').value.trim(),
            confirm_password: this._getDOM().querySelector('#confirm_password').value.trim(),
        };
        return data;
    }

    validateUsername(username) {
        return USERNAME_REGEX.test(username);
    }

    validateEmailFormat(email) {
        return EMAIL_REGEX.test(email);
    }

    validatePassword(password) {
        return PASSWORD_RREGEX.test(password);
    }

    handleCheckboxChange = () => {
        const checkbox = this._getDOM().querySelector('#box-form')._getDOM().querySelector('input');
        if (checkbox.checked) {
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    checkbox: ''
                }
            });
            return true;
        }
        return false;

    };

    validateForm(data) {

        const { password, confirm_password, username, email } = data;
        let hasErrors = false;
        const new_errors = {};
        let long_msg = false;

        Object.entries(data).forEach(([key, value]) => {
            if (value === '') {
                new_errors[key] = this.translator.translate('LANDING.ERRORS.EMPTY_FIELD.' + `${key.toUpperCase()}`);
                hasErrors = true;
            } else {
                if (key === 'username' && !this.validateUsername(username)) {
                    new_errors.username = this.translator.translate('LANDING.ERRORS.INVALID_USERNAME');
                    hasErrors = true;
                    long_msg = true;
                }

                if (key === 'email' && !this.validateEmailFormat(email)) {
                    new_errors.email = this.translator.translate('LANDING.ERRORS.INVALID_EMAIL');
                    hasErrors = true;
                }

                if (key === 'password' && !this.validatePassword(password)) {
                    new_errors.password = this.translator.translate('LANDING.ERRORS.INVALID_PASSWORD');
                    hasErrors = true;
                    long_msg = true;
                }

                if (this.validatePassword(password)) {
                    if (password !== confirm_password) {
                        new_errors.confirm_password = this.translator.translate('LANDING.ERRORS.PASSWORDS_DONT_MATCH');
                        hasErrors = true;
                    }
                }
            }
        });

        if (!this.handleCheckboxChange()) {
            new_errors.checkbox = this.translator.translate('LANDING.ERRORS.CHECKBOX_TERMS');
            hasErrors = true;
        }

        Object.keys(new_errors).forEach(key => {
            if (key === 'username' || key === 'checkbox') {
                const field = this._getDOM().querySelector(`#${key}`);
                if (field) {
                    field.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });

        if (hasErrors) {
            this.setState({
                ...this.state,
                longMsg: long_msg,
                errors: {
                    ...this.state.errors,
                    ...new_errors
                }
            });
        }
        return !hasErrors;
    }


    handleErrorForm(error)
    {
        Object.entries(error).forEach(([key, value]) =>
        {
            if(key === 'non_field_errors')
                key = 'confirm_password';
            this.setState({
                ...this.state,
                errors:{
                    ...this.state.errors,
                    [key]: value[0]
                }
            });
            if(key === 'username' || key === 'checkbox'){
                const field = this._getDOM().querySelector(`#${key}`);
                field.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    clearErrorMsgField(field){
        const clearError = () => {
            if (this.state.errors[field] !== '') {
                this.setState({
                    ...this.state,
                    errors: {
                        ...this.state.errors,
                        [field]: ''
                    }
                });
            }
        };
        this.subscribe(`#${field}`, 'keydown', clearError);
        this.subscribe(`#${field}`, 'input', clearError);
    }

    sendData(){
        const data = this.storeFormData();

        if (!this.validateForm(data))
            return ;

        /*UserService.register(
            data.username,
            data.email,
            data.password,
            data.confirm_password
        ).then(response => {
            SnackbarService.addToast({title: 'Success', body: 'You have logged in successfully',});
            const { access_token: accessToken, refresh_token: refreshToken} = response;
            sessionStorage.setItem('accessToken', accessToken);
            sessionStorage.setItem('refreshToken', refreshToken);
            NavigatorService.goToHome();
        }).catch(error => this.handleErrorForm(error))
            .finally(() => {
                this.setState({
                    ...this.state,
                    isFetching: false,
                });
            });*/
    }

    bind() {

        this.subscribe('#register-btn', 'click', () => this.sendData());

        this.subscribe('#box-form', 'click', () => this.handleCheckboxChange());

        this.subscribe('#close-modal', 'click', () => this.emit('CLOSE_MODAL'));

        const fields = ['username', 'email', 'password', 'confirm_password'];

        fields.forEach(field => this.clearErrorMsgField(field));

    }

    render() {
        return `
                <div class="data-section">
                    <button id="close-modal" class="btn btn-primary p-2 text-light d-flex ms-2 mt-3 fs-2 " style="background-color: transparent; border:none;">
                        <i class="bi bi-x-lg"></i>
                    </button>
                    <div class="scroll-container">
                        <modal-h1-text mt="4.2rem">TRANSCENDENCE</modal-h1-text>
                        <modal-h1-text mt="1.2rem" mb="2rem" color="var(--app-secondary-color);">{{ translator.translate("LANDING.BUTTONS.SIGN_UP") }}</modal-h1-text>
                        <form class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-9">
                                    <div class="row">
                                        <form-field [error]="state.errors.username" id="username" class="mb-5 mt-3" name="username" [longMsg]="state.longMsg"
                                            [labelMsg]="translator.translate('LANDING.FORMS.USERNAME')" placeholder="Jdomingu" required="true">
                                        </form-field>
                            
                                        <form-field [error]="state.errors.email" id="email" class="mb-5" name="email" type="email" 
                                            [labelMsg]="translator.translate('LANDING.FORMS.EMAIL')" placeholder="johndoe@gmail.com" required="true">
                                        </form-field>
                            
                                        <form-field [error]="state.errors.password" id="password" class="mb-5" name="password" type="password" [longMsg]="state.longMsg"
                                            [labelMsg]="translator.translate('LANDING.FORMS.PASSWORD')" placeholder="**********" required="true">
                                        </form-field>
                            
                                        <form-field [error]="state.errors.confirm_password" id="confirm_password" class="mb-5" name="password-confirmation" 
                                            type="password" [labelMsg]="translator.translate('LANDING.FORMS.PASSWORD_CONFIRMATION')" placeholder="**********" required>
                                        </form-field>
                    
                                        <box-form-field [error]="state.errors.checkbox" id="box-form" class="mb-4">
                                            ${this.translator.translate('LANDING.REGISTER.ACCEPT')}
                                        </box-form-field>

                                        <div class="small-btns d-flex gap-4  justify-content-center align-items-center p-0 mt-4 mb-3">
                                            ${this.state.isFetching ? `<div class="d-flex justify-content-center align-items-center bg-dar">
                                            <app-spinner size="5rem"></app-spinner>
                                            </div>` : `<primary-button id="register-btn" color="#8D8DDA" w="100%" h="100%" fs="16px" className="mt-3">
                                                ${this.translator.translate('LANDING.BUTTONS.REGISTER_NOW')}
                                            </primary-button>`}
                                            <secondary-button id="login-btn"  w="100%" h="100%" className="mt-3" fs="16px">{{ translator.translate("LANDING.BUTTONS.LOGIN") }}</secondary-button>
                                        </div>

                                        <p class="mt-4 mb-4 text">{{ translator.translate("LANDING.REGISTER.OR") }}</p>

                                        <primary-button id="register-42-btn" color="var(--app-secondary-color)" txt-color="#000000" 
                                            w="100%" h="65px" fs="16px" class="mb-5">
                                            {{ translator.translate("LANDING.BUTTONS.42_ACCOUNT") }}
                                        </primary-button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            `;
    }
}
);