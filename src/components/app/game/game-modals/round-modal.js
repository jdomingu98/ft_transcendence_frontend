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
        this.state = {
            open: this.getAttribute('finishGame') ?? false,
            tournament: {}
        };

        GameService.getTournamentInfo(this.tournamentId)
            .then( tournament => this.setState({ ...this.state, tournament }));
    }

    get tournamentId() {
        return this.getAttribute('tournamentId');
    }

    bind() {
        this.subscribe('button', 'click', () => {
            this.setState({ ...this.state, open: false });
            //Empezar siguiente partida
        });
    }

    getRoundLabel() {
        const currentRound = this.state.tournament.current_round;
        const totalRound = this.state.tournament.total_round;
        if (currentRound === totalRound)
            return this.translator.translate('TOURNAMENT.ROUND_MODAL.FINALS');
        else if (currentRound === totalRound - 1)
            return this.translator.translate('TOURNAMENT.ROUND_MODAL.SEMIFINALS');
        return this.translator.translate('TOURNAMENT.ROUND_MODAL.TITLE') + currentRound;
    }

    mapRoundMatches() {
        const divs = [];
        const currentOrder = this.state.tournament.current_order_round;
        let count = 0;

        if (!this.state.tournament.players) return '';
        for (let i = 0; i < this.state.tournament.players.length; i+=2) {
            count++;
            divs.push(
                `<div class="position-relative mt-3 fw-semibold background-rectangle ${currentOrder === count ? 'shadow' : '' }">
                    <div class="position-absolute top-0 start-0 h-100 left-half" style="width: 45%">
                        <p class="ellipsis">${ this.state.tournament.players[i] }</p>
                    </div>
                    <div class="position-absolute top-0 end-0 h-100 text-black right-half" style="width: 50%">
                        <p class="ellipsis">${ this.state.tournament.players[i + 1] }</p>
                    </div>
                </div>`
            );
        }
        return divs.join('');
    }

    render() {
        const numElements = this.state.tournament.players?.length;
        const columns = numElements ? Math.floor(Math.sqrt(numElements / 2)) : 1;
        const modalWidth = columns === 4 ? '70%' : columns === 2 ? '600px' : '450px';
        return `
            <div class="game-body">
                <div id="roundModal" class="game-modal ${!this.accessToken ? 'move-left' : ''} ${this.state.open ? 'open' : ''}" style="max-width: ${modalWidth}">
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
});