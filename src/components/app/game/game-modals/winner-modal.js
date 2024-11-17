import WebComponent, { Component } from '#WebComponent';
import Confetti from './confetti';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'winner-modal',
    styleCSS: css
},
class WinnerModal extends WebComponent {

    confetti = null;
    isTournamentLastRound = this.getAttribute('isTournamentLastRound');
    isSimpleMatchOver = this.getAttribute('isSimpleMatchOver');
    tournamentName = this.getAttribute('tournamentName');
    winner = this.getAttribute('winner');

    init() {
        this.state = {
            isOpen: false,
        };
    }

    get modal() {
        return this._getDOM().getElementById('winnerModal');
    }

    closeModal() {
        this.modal.classList.remove('open');
        if (this.state.isOpen)
            this.setState({...this.state, isOpen: false});
    }

    showModal() {
        this.modal.classList.add('open');
        console.log(this.modal.classList);
        if (!this.state.isOpen) {
            this.setState({...this.state, isOpen: true});
            if (this.isTournamentLastRound || this.isSimpleMatchOver /*&& stopConfetti*/)
                this.confetti.runConfetti();
        }
    }

    get canvas() {
        return this._getDOM().getElementById('confettiCanvas');
    }

    bind() {
        this.subscribe('button', 'click', () => {
            this.confetti.setModalState(false);
            this.closeModal();
        });
    }

    afterViewInit() {
        this.confetti = new Confetti(this.canvas);
    }

    getTournamentFinishedRender() {
        return `
            <div class="container text-white text-uppercase" style="letter-spacing: 0.05em">
                <div class="my-3">
                    <h2 class="mb-3">TRANSCENDENCE</h2>
                    <h3 class="mb-4">TOURNAMENT FINISHED</h3>
                </div>
                <h4 class="mt-4" style="font-size: 1.4rem">🎉🎉 CONGRATULATIONS! 🎉🎉</h4>
                <div class="my-5 d-flex align-items-center justify-content-center rounded-pill winner-block">
                    <p>{{ winner }}</p>
                </div>
                <p class="mb-4 fw-semibold text-center">You are the winner of the ${this.tournamentName} tournament!</p>
                <button class="primary-btn-alt mt-4" style="width: 85%; height: 50px">Create new tournament</button>
            </div>
        `;
    }

    getMatchFinishedRender() {
        return `
            <div class="container text-white text-uppercase" style="letter-spacing: 0.05em">
                <div class="my-3">
                    <h2 class="mb-3">TRANSCENDENCE</h2>
                    <h3 class="mb-4">MATCH FINISHED</h3>
                </div>
                <h4 class="mt-4" style="font-size: 1.4rem">🎉🎉 CONGRATULATIONS! 🎉🎉</h4>
                <div class="my-5 d-flex align-items-center justify-content-center rounded-pill winner-block">
                    <p>{{ winner }}</p>
                </div>
                <p class="mb-4 fw-semibold">You are the winner of the match!</p>
                <button class="primary-btn-alt mt-4" style="width: 85%; height: 50px">Play again</button>
            </div>
        `;
    }

    render() {
        return `
            <div class="game-body">
                <div id="winnerModal" class="game-modal">
                    ${ this.isTournamentLastRound ? this.getTournamentFinishedRender() : this.getMatchFinishedRender() }
                </div>
                <canvas id="confettiCanvas" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>
            </div>
        `;
    }
});