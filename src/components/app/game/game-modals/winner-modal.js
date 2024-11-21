import WebComponent, { Component } from '#WebComponent';
import Confetti from './confetti';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'winner-modal',
    styleCSS: css
},
class WinnerModal extends WebComponent {

    confetti = new Confetti();
    isTournamentLastRound = this.getAttribute('isTournamentLastRound');

    init() {
        this.state = {
            open: this.getAttribute('finishGame') ?? false,
        };
    }

    get winner() {
        return this.getAttribute('winner');
    }

    bind() {
        this.subscribe('button', 'click', () => {
            this.confetti.setRunning(false);
            this.setState({
                ...this.state,
                open: false
            });
            setTimeout(() => window.location.reload(), 7000);
        });
    }

    afterViewInit() {
        const canvas = this._getDOM().getElementById('confettiCanvas');
        this.confetti.setCanvas(canvas);
        if (this.isTournamentLastRound || this.state.open)
            this.confetti.runConfetti();
    }

    getTournamentFinishedRender(name) {
        return `
            <div class="container text-white text-uppercase" style="letter-spacing: 0.05em">
                <div class="my-3">
                    <h2 class="mb-3">TRANSCENDENCE</h2>
                    <h3 class="mb-4">TOURNAMENT FINISHED</h3>
                </div>
                <h4 class="mt-4" style="font-size: 1.4rem">🎉🎉 CONGRATULATIONS! 🎉🎉</h4>
                <div class="my-5 d-flex align-items-center justify-content-center rounded-pill winner-block">
                    <p>${this.winner}</p>
                </div>
                <p class="mb-4 fw-semibold text-center">You are the winner of the ${name} tournament!</p>
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
                    <p>${this.winner}</p>
                </div>
                <p class="mb-4 fw-semibold">You are the winner of the match!</p>
                <button class="primary-btn-alt mt-4" style="width: 85%; height: 50px">Play again</button>
            </div>
        `;
    }

    render() {
        const tournamentName = this.getAttribute('name');
        return `
            <div class="game-body">
                <div id="winnerModal" class="game-modal ${this.state.open ? 'open' : ''}">
                    ${ this.isTournamentLastRound ? this.getTournamentFinishedRender(tournamentName) : this.getMatchFinishedRender() }
                </div>
                <canvas id="confettiCanvas" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>
            </div>
        `;
    }
});