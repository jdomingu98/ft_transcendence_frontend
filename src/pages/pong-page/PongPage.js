import '/src/components/app/game';
import { Sounds } from '/src/components/app/game/PongUtils';
import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-page',
},
class PongPage extends WebComponent {

    #firstTimePaused = false

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
        this.subscribe('landing-auth-modal', 'OPEN_OTP', ({ detail }) => this.showOTPModal(detail));
        this.subscribe('app-game', 'ON_PAUSE', ({ detail: paused }) => {
            if (!paused && !this.#firstTimePaused) {
                this.#firstTimePaused = true;
                Sounds.startBackgroundMusic();
            }
        })
    }

    onDestroy() {
        Sounds.stopBackgroundMusic();
    }

    render() {
        if (this.state.accessToken)
            NavigatorService.goToSidebarElementPage(this.state.isTournament ? 'tournament': 'game');
        return `
            <div class="h-100 w-100" style="max-height: 100vh">
                <landing-auth-modal></landing-auth-modal>
                <landing-otp-modal></landing-otp-modal>
                <landing-navbar></landing-navbar>
                <section class="d-flex justify-content-center align-items-center" style="background-color: var(--app-primary-bg-color)">
                    <div style="max-width: 70%">
                        <app-game [useRandomPlayers]="true"></app-game>
                    </div>
                </section>
            </div>
        `;
    }
});