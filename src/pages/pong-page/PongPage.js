import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-page',
},
class PongPage extends WebComponent {

    showModal(section) {
        const modal = this._getDOM().querySelector('landing-auth-modal');
        modal.openModal(section);
    }

    showOTPModal(username) {
        const otpModal = this._getDOM().querySelector('landing-otp-modal');
        otpModal.openModal(username);
    }

    bind() {
        this.subscribe('landing-navbar', 'OPEN_MODAL', () => this.showModal('LOGIN'));
        this.subscribe('landing-auth-modal', 'OPEN_OTP', ({detail}) => this.showOTPModal(detail));
    }

    render() {
        return `
            <landing-auth-modal></landing-auth-modal>
            <landing-otp-modal></landing-otp-modal>
            <landing-navbar></landing-navbar>
            <app-game></app-game>
            <landing-footer></landing-footer>
        `;
    }
});