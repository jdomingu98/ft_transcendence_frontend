import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-page',
},
class PongPage extends WebComponent {

    init() {
        this.state = {
            accessToken: localStorage.getItem('access_token'),
            isTournament: window.location.pathname.includes('tournament')
        };
    }

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
        if (this.state.accessToken)
            NavigatorService.goToSidebarElementPage( this.state.isTournament ? 'tournament': 'game');
        return `
            <div class="h-100 w-100" style="max-height: 100vh">
                <landing-auth-modal></landing-auth-modal>
                <landing-otp-modal></landing-otp-modal>
                <landing-navbar></landing-navbar>
                <section style="background-color: var(--app-primary-bg-color)">
                    <app-game></app-game>
                </section>
            </div>
        `;
    }
});