import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService.js';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService';
import css from './landing-otp-modal.css?inline';

export default Component ({
    tagName: 'landing-otp-modal',
    styleCSS: css
},
class LandingOtpModal extends WebComponent {

    openModal(username) {
        const otpModal = this._getDOM().getElementById('otpModal');
        this.username = username;
        otpModal.showModal();
    }

    bind() {
        const codeInput = this._getDOM().getElementById('otp-code');
        const errorMessageElement = this._getDOM().querySelector('.error-message');

        this.subscribe('form input', 'input', () => {
            codeInput.classList.remove('input-error');
            errorMessageElement.classList.add('hidden');
        });

        this.subscribe('form button', 'click', e => {
            e.preventDefault();
            const code = codeInput.value.trim();
            AuthService.verifyOTP({username: this.username, code}).then(response => {
                SnackbarService.addToast({
                    title: this.translator.translate('SNACKBAR.OTP_MODAL.TITLE'),
                    body: this.translator.translate('SNACKBAR.OTP_MODAL.DESC')
                });
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                setTimeout(() => NavigatorService.goToHome(), 3000);
            }).catch(e => {
                errorMessageElement.classList.remove('hidden');
                errorMessageElement.textContent = e.error;
                codeInput.classList.add('input-error');
            });
        });
    }

    render() {
        return `
            <div class="d-flex justify-content-center align-items-center m-0 p-0">
                <dialog id="otpModal" class="otp-modal top-50 position-fixed start-50 w-100 h-100">
                    <div class="position-relative d-flex justify-content-center align-items-center w-100 h-100">
                        <div class="otp-form top-0 d-flex row justify-content-center align-items-center">
                            <h2 class="py-3 text-white text-center">{{ translator.translate('LANDING.OTP.TITLE') }}</h2>
                            <p class="intro text-white text-center">${ this.translator.translate('LANDING.OTP.DESC') }</p>
                            <form class="d-flex row justify-content-center align-items-center w-100">
                                <input type="text" id="otp-code" class="my-3 p-3" minlength="6" maxlength="6" placeholder="XXXXXX" required>
                                <p class="mx-0 error-message hidden"></p>
                                <button class="my-3 p-3 text-uppercase text-black">{{ translator.translate('LANDING.OTP.BUTTON_TITLE') }}</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        `;
    }
});