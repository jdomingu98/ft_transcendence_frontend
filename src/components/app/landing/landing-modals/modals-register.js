import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';
import { UserService } from '../../../../../lib/services/UserService';

import css from './modal-register.css?inline';


export default Component(
    {
        tagName: 'modal-register',
        styleCSS: css,
    },

    class ModalRegister extends WebComponent {

        init() {
            this.state = {
                submitting: false
            };
        }
        closeModal() {
            const overlay = this._getDOM().querySelector('.overlay');
            const modal = this._getDOM().querySelector('.modal-form');

            overlay.classList.add('hidden');
            modal.classList.add('hidden');
        }


        closeEsc = (e) => {
            const modal = this._getDOM().querySelector('.modal-form');
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.closeModal();
            }
        };
        storeFormData(){
            const data = {
                username: this._getDOM().querySelector('#username').value.trim(),
                email: this._getDOM().querySelector('#email').value.trim(),
                password: this._getDOM().querySelector('#password').value.trim(),
                confirm_password: this._getDOM().querySelector('#confirm_password').value.trim(),
            };
            return data;
        }

        checkForms(data)
        {
            let hasErrors = false;
            const errors = {};

            Object.entries(data).forEach(([key, value]) => {
                if (value === '') {
                    errors[key] =` ${key} is required`;
                    hasErrors = true;
                }
            });
            if (hasErrors){
                // Pass errors to form-field components
                Object.entries(errors).forEach(([key, msg]) => {
                    const field = this._getDOM().querySelector(`#${key}`);
                    const field_error = field._getDOM().querySelector('.error-alert');
                    field_error.querySelector('.error-msg').innerHTML = msg;
                    field_error.classList.remove('hidden');
                    field.scrollIntoView({ behavior: 'smooth', block: 'end' });
                    setTimeout(() => {
                        field_error.classList.add('hidden');
                    }, 3000);
                });
            }
            else{
                return true;
            }
            return false;
        }

        handleCheckboxChange = () => {
            const checkbox = this._getDOM().querySelector('#box-form')._getDOM().querySelector('input');
            const registerButton = this._getDOM().querySelector('#register-btn');
            console.log(checkbox);
            if (checkbox.checked) {
                console.log(registerButton);
                registerButton.setAttribute('color', 'red');
                console.log(registerButton);
            } else {
                registerButton.classList.remove('active');
            }
        };

        sendData(){
            const data = this.storeFormData();
            if(this.checkForms(data) === false) {console.log("Unos de los form no esta completos"); return ;}

            /* UserService.register(
                data.username,
                data.email,
                data.password,
                data.confirm_password
            ).then(response => console.log(response))
            .catch(error => console.error(error)) */
            // Spinner

        }

        bind() {
            this.subscribe('.overlay', 'click', () => {
                this.closeModal();
            });

            this.subscribe('close-modal', 'click', () => {
                this.closeModal();
            });

            this.subscribe('#register-btn', 'click', () => {
                this.sendData();
            });

            this.subscribe('#box-form', 'click', () => {
                this.handleCheckboxChange();
            });

            document.addEventListener('keydown', this.closeEsc);
            return () => {
                document.removeEventListener('keydown', this.closeEsc);
            };
        }

        render() {
            return `
        <div class="overlay hidden"></div>
        <div class="modal-form"> 
            <div class="img-section"></div>
            <div class="data-section">
                <div class="scroll-container">
                    <close-modal></close-modal>
                    <modal-h1-text mt="0.5rem">TRANSCENDENCE</modal-h1-text>
                    <modal-h1-text mt="1.2rem" mb="2rem" color="var(--app-secondary-color);">{{ translator.translate("LANDING.BUTTONS.SIGN_UP") }}</modal-h1-text>
                    <form class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-12 col-md-9">
                                <div class="row">
                                    <form-field id="username" rl="username" [text]="translator.translate('LANDING.FORMS.USERNAME')" placeholder="Jdomingu" required="true"></form-field>
                                    <form-field id="email" rl=email type="email" [text]="translator.translate('LANDING.FORMS.EMAIL')" placeholder="johndoe@gmail.com" required="true"></form-field>
                                    <form-field id="password" rl="password" type="password" [text]="translator.translate('LANDING.FORMS.PASSWORD')" placeholder="**********" required="true"></form-field>
                                    <form-field id="confirm_password" rl="password-confirmation" type="password" [text]="translator.translate('LANDING.FORMS.PASSWORD_CONFIRMATION')" placeholder="**********" required></form-field>
                                    <box-form-field id="box-form"></box-form-field>
                                    <div class="small-btns d-flex gap-4 justify-content-center align-items-center">
                                        <primary-button id="register-btn" color="#5c5c89" w="200px" h="65px" bootstrap="mt-3">{{ translator.translate("LANDING.BUTTONS.REGISTER_NOW") }}</primary-button>
                                        <secondary-button  w="200px" h="65px" bootstrap="mt-3">{{ translator.translate("LANDING.BUTTONS.LOGIN") }}</secondary-button>
                                    </div>
                                    <modal-span-text mt="1rem" mb="1rem">{{ translator.translate("LANDING.SPAN.OR") }}</modal-span-text>
                                    <primary-button color="var(--app-secondary-color)" txt-color="#000000" w="100%" h="65px" bootstrap="mb-5">{{ translator.translate("LANDING.BUTTONS.REGISTER_42") }}</primary-button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;
        }
    }
);
