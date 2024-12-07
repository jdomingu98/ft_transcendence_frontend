import WebComponent, { Component } from '#WebComponent';
import Confetti from './confetti';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'winner-modal',
    styleCSS: css
},
class WinnerModal extends WebComponent {
    #confetti = null;

    init() {
        this.state = { open: true };
    }

    bind() {
        this.subscribe('button', 'click', () => {
            this.#confetti.stop();
            this.setState({ open: false });
            setTimeout(() => window.location.reload(), 7000);
        });
    }

    afterViewInit() {
        const canvas = this._getDOM().getElementById('confettiCanvas');
        if (!this.#confetti) {
            this.#confetti = new Confetti(canvas);
            this.#confetti.runConfetti();
        }
    }

    onDestroy() {
        this.#confetti.cleanListeners();
    }

    getContent() {
        const config = this.getAttribute('config');
        const winner = this.getAttribute('winner');

        return `
            <div class="container text-white text-uppercase" style="letter-spacing: 0.05em">
                <div class="my-3">
                    <h2 class="mb-3">TRANSCENDENCE</h2>
                    <h3 class="mb-4">${this.translator.translate(config.label.title)}</h3>
                </div>
                <h4 class="mt-4" style="font-size: 1.4rem">{{ translator.translate('WINNER_MODAL.CONGRATULATIONS') }}</h4>
                <div class="my-5 d-flex align-items-center justify-content-center rounded-pill winner-block">
                    <p>${winner}</p>
                </div>
                <p class="mb-4 fw-semibold text-center">
                    ${this.translator.translate(config.label.description)}
                </p>
                <button class="primary-btn-alt mt-4" style="width: 85%; height: 50px">
                    ${this.translator.translate(config.label.button)}
                </button>
            </div>
        `;
    }

    render() {
        const accessToken = localStorage.getItem('access_token');
        return `
            <div class="game-body">
                <div id="winnerModal" class="game-modal ${!accessToken ? 'move-left' : ''} ${this.state.open ? 'open' : ''}">
                    ${ this.getContent() }
                </div>
                <canvas id="confettiCanvas" width="${window.innerWidth}" height="${window.innerHeight}"></canvas>
            </div>
        `;
    }
});