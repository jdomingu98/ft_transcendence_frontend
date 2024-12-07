import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'round-modal',
    styleCSS: css
},
class RoundModal extends WebComponent {

    accessToken = localStorage.getItem('access_token');

    init() {
        GameService.getTournamentInfo(this.tournament.id).then(tournament => this.setState({
            currentOrderRound: tournament.current_order_round - 1,
            currentRound: tournament.current_round,
            totalOrderRound: tournament.total_order_round,
            totalRound: tournament.total_round,
        }));
    }

    get tournament() {
        return this.getAttribute('tournament');
    }

    bind() {
        this.subscribe('button', 'click', () => this.emit('ROUND_MATCH_START', this.state));
    }

    getRoundLabel() {
        const { currentRound, totalRound } = this.tournament;
        if (currentRound === totalRound)
            return this.translator.translate('TOURNAMENT.ROUND_MODAL.FINALS');
        else if (currentRound === totalRound - 1)
            return this.translator.translate('TOURNAMENT.ROUND_MODAL.SEMIFINALS');
        return this.translator.translate('TOURNAMENT.ROUND_MODAL.TITLE') + currentRound;
    }

    mapRoundMatches() {
        const { currentOrder, players } = this.tournament;

        if (!players) return '';
        return this.#groupByPairs(players)
            .map(({ even, odd }, i) => `<div class="position-relative mt-3 fw-semibold background-rectangle ${currentOrder === (i + 1) ? 'shadow' : '' }">
                    <div class="position-absolute top-0 start-0 h-100 left-half" style="width: 45%">
                        <p class="ellipsis">${ even }</p>
                    </div>
                    <div class="position-absolute top-0 end-0 h-100 text-black right-half" style="width: 50%">
                        <p class="ellipsis">${ odd }</p>
                    </div>
                </div>`)
            .join('');
    }

    render() {
        const numElements = this.state.players?.length;
        const columns = numElements ? Math.floor(Math.sqrt(numElements / 2)) : 1;
        const modalWidth = columns === 4 ? '70%' : columns === 2 ? '600px' : '450px';
        return `
            <div class="game-body">
                <div id="roundModal" class="game-modal ${!this.accessToken ? 'move-left' : ''} open" style="max-width: ${modalWidth}">
                    <div class="container text-white text-uppercase" style="letter-spacing: 0.05em">
                        <div class="my-3">
                            <h2 class="mb-3">TRANSCENDENCE</h2>
                            <h3 class="mb-1">${ this.getRoundLabel() }</h3>
                        </div>
                        <div class="grid-container mb-3" style="grid-template-columns: repeat(${columns}, 1fr)">
                            ${ this.mapRoundMatches() }
                        </div>
                        <button class="primary-btn-alt mt-4" style="width: 85%; height: 50px">{{ translator.translate('TOURNAMENT.ROUND_MODAL.BUTTON')}}</button>
                    </div>
                </div>
            </div>
        `;
    }

    #groupByPairs(array) {
        return array
            .filter((_, i) => i % 2 === 0)
            .map((even, i) => ({ even, odd: array[(i * 2) + 1] }));
    }
});