import '/src/components/app/game';
import { Sounds } from '/src/components/app/game/PongUtils';
import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-page',
},
class PongPage extends WebComponent {

    #firstTimePaused = false;

    init() {
        this.state = {
            accessToken: localStorage.getItem('access_token'),
            isTournament: window.location.pathname.includes('tournament'),
            stop: true,
            isRegistrationOpen: true,
            playerOne: null,
            playerTwo: null,
            winner: '',
            isMatchOver: false,
            numGoalsScored: 0,
            numGoalsAgainst: 0,
            winnerModalConfig: {
                label: {
                    title: 'WINNER_MODAL.LOCAL_MATCH.TITLE',
                    description: 'WINNER_MODAL.LOCAL_MATCH.DESC',
                    button: 'WINNER_MODAL.LOCAL_MATCH.BUTTON',
                }
            }
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

        this.subscribe('local-match-registration-modal', 'START_LOCAL_MATCH', ({detail}) => {
            Sounds.startBackgroundMusic();
            this.setState({
                ...this.state,
                stop: false,
                isRegistrationOpen: false,
                playerOne: detail.playerOne,
                playerTwo: detail.playerTwo,
            });
        });


        this.subscribe('app-game', 'ON_PAUSE', ({ detail: paused }) => {
            if (!paused && !this.#firstTimePaused) {
                this.#firstTimePaused = true;
                Sounds.startBackgroundMusic();
            }
        });

        this.subscribe('app-game', 'FINISH_GAME', ({ detail }) => {
            this.setState({
                ...this.state,
                stop: true,
                isMatchOver: true,
                winner: detail.winner,
                playerOne: detail.playerOne,
                playerTwo: detail.player,
                numGoalsScored: detail.numGoalsScored,
                numGoalsAgainst: detail.numGoalsAgainst,
            });
        });
    }

    onDestroy() {
        Sounds.stopBackgroundMusic();
    }

    render() {
        if (this.state.accessToken) {
            NavigatorService.goToSidebarElementPage(this.state.isTournament ? 'tournament': 'game');
            return;
        }
        return `
            <landing-auth-modal></landing-auth-modal>
            <landing-otp-modal></landing-otp-modal>
            <landing-navbar></landing-navbar>
            <local-match-registration-modal [open]="state.isRegistrationOpen"></local-match-registration-modal>
            ${this.state.isMatchOver ? `
                <winner-modal [winner]="state.winner" [config]="state.winnerModalConfig"></winner-modal>
            ` : ''}
            <section class="d-flex justify-content-center align-items-center" style="background-color: var(--app-primary-bg-color)">
                <div style="max-width: 70%">
                    <app-game
                        [useRandomPlayers]="true"
                        [isStopped]="state.stop"
                        [playerOne]="state.playerOne"
                        [playerTwo]="state.playerTwo"
                        [numGoalsScored]="state.numGoalsScored"
                        [numGoalsAgainst]="state.numGoalsAgainst"
                    ></app-game>
                </div>
            </section>
        `;
    }
});