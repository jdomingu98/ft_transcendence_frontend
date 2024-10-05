import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';

import css from './landing-auth-modal.css?inline';

export default Component ({
    tagName: 'landing-auth-modal',
    styleCSS: css
},
class LandingAuthModal extends WebComponent {

    openModal(section) {
        const authBody = this._getDOM().querySelector('.auth-body');
        const authModal = this._getDOM().getElementById('authModal');
        authBody.classList.remove('slide-forgot');
        if (section === 'LOGIN')
            authBody.classList.add('slide');
        else
            authBody.classList.remove('slide');
        authModal.showModal();
    }

    cleanInputs() {
        const forms = this._getDOM().querySelectorAll('.formBx > *');
        const parts = ['signupform', 'signinform', 'forgotform'];
        const queryParts = (form, selector) =>
            parts.flatMap(part =>
                Array.from(form.shadowRoot.querySelectorAll(`[part="${part}"] ${selector}`))
            );

        const inputs = Array.from(forms).flatMap(form => queryParts(form, 'input'));
        const errorMessages = Array.from(forms).flatMap(form => queryParts(form, '.error-message'));

        inputs.filter(input => input.type !== 'submit').forEach(input => {
            input.classList.remove('input-error');
            input.value = '';
        });

        errorMessages.forEach(errorMessage => {
            errorMessage.textContent = '';
            errorMessage.classList.add('hidden');
        });
    }

    bind() {
        const authBody = this._getDOM().querySelector('.auth-body');
        const authModal = this._getDOM().getElementById('authModal');

        this.subscribe('register-form', 'ON_SIGNIN_CLICK', () => {
            authBody.classList.add('slide');
        });

        this.subscribe('login-form', 'ON_SIGNUP_CLICK', () => {
            authBody.classList.remove('slide');
        });

        this.subscribe('login-form', 'LOGIN_TO_FORGOT_CLICK', () => {

        this.subscribe('login-form', 'OPEN_OTP', () => this.emit('OPEN_OTP'));

        this.subscribe('forgot-password-form', 'FORGOT_TO_LOGIN_CLICK', () => {
            authBody.classList.remove('slide-forgot');
        });

        this.subscribeAll('.formBx > *', 'CLOSE_MODAL', () => {
            this.cleanInputs();
            authModal.close();
        });

        // Closes modal when clicks outside the content
        this.subscribe('#authModal', 'click', e => {
            const rect = authModal.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom) {
                this.cleanInputs();
                authModal.close();
            }
        });
    }

    render() {
        return `
            <div class="auth-body">
                <dialog id="authModal" class="auth-modal">
                    <div class="container">
                        <div class="formBx">
                            <register-form></register-form>
                            <login-form></login-form>
                            <forgot-password-form></forgot-password-form>
                        </div>
                    </div>
                </dialog>
            </div>
        `;
    }
}
);