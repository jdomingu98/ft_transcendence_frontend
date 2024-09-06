import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';
import { UserService } from '../../../../../../lib/services/UserService';

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
                submitting: false,
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

        handleEmptyForms(data)
        {
            let hasErrors = false;

            Object.entries(data).forEach(([key, value]) => {
                if (value === '') {
                    const msgError = capitalizeFirstLetter(`${key}`) + ' is required';
                    this.setState({
                        ...this.state,
                        errors: {
                            ...this.state.errors,
                            [key]: msgError
                        }
                    });
                    if(`${key}` === 'username' || `${key}` === 'checkbox'){
                        const field = this._getDOM().querySelector(`#${key}`);
                        field.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                    hasErrors = true;
                }
            });
            return hasErrors ? false : true;
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
            });
        }

        handleCheckboxChange = () => {
            const checkbox = this._getDOM().querySelector('#box-form')._getDOM().querySelector('input');
            const registerButton = this._getDOM().querySelector('#register-btn')._getDOM().querySelector('button');

            registerButton.classList.remove('lighting', 'shutdown');

            if (checkbox.checked) {
                registerButton.classList.add('lighting');
                this.setState({
                    ...this.state,
                    errors: {
                        ...this.state.errors,
                        checkbox: ''
                    }
                });
                return true;
            }

            registerButton.classList.add('shutdown');
            return false;

        };

        clearErrorMsgField(field){
            this.subscribe(`#${field}`, 'keydown', () => {
                this.setState({
                    ...this.state,
                    errors:{
                        ...this.state.errors,
                        [field]:''
                    }
                });
            });
        }

        sendData(){
            const data = this.storeFormData();

            if(!this.handleEmptyForms(data) || !this.handleCheckboxChange())
            {
                const errors = { ...this.state.errors };

                if(!this.handleCheckboxChange()){
                    errors.checkbox = 'Please accept the terms to continue.';
                }
                this.setState({...this.state, errors });
                return ;
            }

            UserService.register(
                data.username,
                data.email,
                data.password,
                data.confirm_password
            ).catch(error => this.handleErrorForm(error));
            // TODO: Spinner
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
                                        <form-field [error]="state.errors.username" id="username" rl="username" [text]="translator.translate('LANDING.FORMS.USERNAME')" placeholder="Jdomingu" required="true"></form-field>
                                        <form-field [error]="state.errors.email" id="email" rl=email type="email" [text]="translator.translate('LANDING.FORMS.EMAIL')" placeholder="johndoe@gmail.com" required="true"></form-field>
                                        <form-field [error]="state.errors.password" id="password" rl="password" type="password" [text]="translator.translate('LANDING.FORMS.PASSWORD')" placeholder="**********" required="true"></form-field>
                                        <form-field [error]="state.errors.confirm_password" id="confirm_password" rl="password-confirmation" type="password" [text]="translator.translate('LANDING.FORMS.PASSWORD_CONFIRMATION')" placeholder="**********" required></form-field>
                                        <box-form-field [error]="state.errors.checkbox" id="box-form"></box-form-field>
                                        <div class="small-btns d-flex gap-4  justify-content-center align-items-center p-0">
                                            <primary-button id="register-btn" color="#5c5c89" w="100%" h="100%" fs="16px" claseName="mt-3">{{ translator.translate("LANDING.BUTTONS.REGISTER_NOW") }}</primary-button>
                                            <secondary-button id="login-btn"  w="100%" h="100%" claseName="mt-3" fs="16px">{{ translator.translate("LANDING.BUTTONS.LOGIN") }}</secondary-button>
                                        </div>
                                        <modal-span-text mt="2rem" mb="1rem">{{ translator.translate("LANDING.SPAN.OR") }}</modal-span-text>
                                        <primary-button  id="register-42-btn" color="var(--app-secondary-color)" txt-color="#000000" w="100%" h="65px" fs="16px" claseName="mb-5">{{ translator.translate("LANDING.BUTTONS.REGISTER_42") }}</primary-button>
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
