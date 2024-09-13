import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService.js';
import { SnackbarService } from '#services/SnackbarService';
import { UserService } from '#services/UserService';

import css from './register-section.css?inline';

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


export default Component(
    {
        tagName: 'register-section',
        styleCSS: css,
    },

    class RegisterSection extends WebComponent {
        init() {
            this.state = {
                isFetching: false,
                errors: {}
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
            const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
            return usernameRegex.test(username);
        }

        validateEmailFormat(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        validatePassword(password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
            return passwordRegex.test(password);
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
            const errors = {};

            Object.entries(data).forEach(([key, value]) => {
                if (value === '') {
                    errors[key] = `${capitalizeFirstLetter(key)} is required`;
                    hasErrors = true;
                } else {
                    if (key === 'username' && !this.validateUsername(username)) {
                        errors.username = 'Invalid username';
                        hasErrors = true;
                    }

                    if (key === 'email' && !this.validateEmailFormat(email)) {
                        errors.email = 'Invalid email (name@example.com)';
                        hasErrors = true;
                    }

                    if (key === 'password' && !this.validatePassword(password)) {
                        errors.password = 'Invalid password';
                        hasErrors = true;
                    }

                    if (key === 'confirm_password' && password !== confirm_password) {
                        errors.confirm_password = 'Passwords do not match';
                        hasErrors = true;
                    }
                }
            });

            if (!this.handleCheckboxChange()) {
                errors.checkbox = 'Please accept the terms to continue.';
                hasErrors = true;
            }

            Object.keys(errors).forEach(key => {
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
                    errors: {
                        ...this.state.errors,
                        ...errors
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
                this.setState({
                    ...this.state,
                    errors: {
                        ...this.state.errors,
                        [field]: ''
                    }
                });
            };
            this.subscribe(`#${field}`, 'keydown', clearError);
            this.subscribe(`#${field}`, 'input', clearError);
        }

        sendData(){
            const data = this.storeFormData();

            if (!this.validateForm(data))
                return ;

            UserService.register(
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
                });
        }

        bind() {

            this.subscribe('#register-btn', 'click', () => this.sendData());

            this.subscribe('#box-form', 'click', () => this.handleCheckboxChange());

            this.subscribe('close-modal', 'click', () => this.emit('CLOSE_MODAL'));

            const fields = ['username', 'email', 'password', 'confirm_password'];

            fields.forEach(field => this.clearErrorMsgField(field));

        }

        render() {
            return `
                <div class="data-section">
                    <div class="scroll-container">
                        <close-modal></close-modal>
                        <modal-h1-text mt="0.5rem">TRANSCENDENCE</modal-h1-text>
                        <modal-h1-text mt="1.2rem" mb="2rem" color="var(--app-secondary-color);">{{ translator.translate("LANDING.BUTTONS.SIGN_UP") }}</modal-h1-text>
                        <form class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-9">
                                    <div class="row">

                                        <form-field [error]="state.errors.username" id="username" class="mb-5 mt-3" name="username" [labelMsg]="translator.translate('LANDING.FORMS.USERNAME')" placeholder="Jdomingu" required="true"></form-field>
                                        <form-field [error]="state.errors.email" id="email" class="mb-5" name=email type="email" [labelMsg]="translator.translate('LANDING.FORMS.EMAIL')" placeholder="johndoe@gmail.com" required="true"></form-field>
                                        <form-field [error]="state.errors.password" id="password" class="mb-5" name="password" type="password" [labelMsg]="translator.translate('LANDING.FORMS.PASSWORD')" placeholder="**********" required="true"></form-field>
                                        <form-field [error]="state.errors.confirm_password" id="confirm_password" class="mb-5" name="password-confirmation" type="password" [labelMsg]="translator.translate('LANDING.FORMS.PASSWORD_CONFIRMATION')" placeholder="**********" required></form-field>
                                        
                                        <box-form-field [error]="state.errors.checkbox" id="box-form"  class="mt-2 mb-4">{{ translator.translate("LANDING.SPAN.ACCEPT") }} <a href="/terms-conditions" class="terms-link" target="_blank">{{ translator.translate("LANDING.SPAN.TERMS_CONDITIONS") }}</a></box-form-field>
                                        
                                        <div class="small-btns d-flex gap-4  justify-content-center align-items-center p-0 mt-4">
                                        ${this.state.isFetching ? `<div class="d-flex justify-content-center align-items-center bg-dar">
                                                <app-spinner size="5rem"></app-spinner>
                                             </div>` : `<primary-button id="register-btn" color="#8D8DDA" w="100%" h="100%" fs="16px" claseName="mt-3">
                                                ${this.translator.translate('LANDING.BUTTONS.REGISTER_NOW')}
                                            </primary-button>`}
                                            <secondary-button id="login-btn"  w="100%" h="100%" claseName="mt-3" fs="16px">{{ translator.translate("LANDING.BUTTONS.LOGIN") }}</secondary-button>
                                        </div>

                                        <p class="mt-4 mb-4 text">{{ translator.translate("LANDING.SPAN.OR") }}</p>
                                        
                                        <primary-button id="register-42-btn" color="var(--app-secondary-color)" txt-color="#000000" w="100%" h="65px" fs="16px" claseName="mb-5">{{ translator.translate("LANDING.BUTTONS.REGISTER_42") }}</primary-button>
                                    
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
