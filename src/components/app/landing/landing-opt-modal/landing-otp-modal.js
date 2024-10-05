import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';

import css from './landing-auth-modal.css?inline';

export default Component ({
    tagName: 'landing-otp-modal',
    styleCSS: css
},
class LandingOtpModal extends WebComponent {

    openModal() {
        const otpModal = this._getDOM().getElementById('otpModal');
        otpModal.showModal();
    }

    bind() {
        const otpModal = this._getDOM().getElementById('otpModal');

        // Closes modal when clicks outside the content
        this.subscribe('#otpModal', 'click', e => {
            const rect = otpModal.getBoundingClientRect();
            if (e.clientX < rect.left || e.clientX > rect.right ||
                e.clientY < rect.top || e.clientY > rect.bottom)
                otpModal.close();
        });
    }

    render() {
        return `
            <div class="otp-body">
                <dialog id="optModal" class="otp-modal">
                    <div class="container">
                        <div class="formBx">
                            <div class="otp-form">
                                <div class="icons-toolbar">
                                    <i class='closeModal'></i>
                        </div>
                    </div>
                </dialog>
            </div>
            `;
    }
}
);