import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import { Sounds } from '/src/components/app/game/PongUtils';
import UserService from '#services/UserService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-sidebar'
},
class PongSidebar extends WebComponent {

    init() {
        this.state = {
            isTournament: window.location.pathname.includes('tournament'),
            stop: true,
            isRegistrationOpen: true,
            user: {},
            tournament: {
                id: 0,
                name: '',
                playerList: [],
                currentRound: 1,
                currentOrder: 1,
                totalOrder: 1,
                totalRound: 1,
                isTournamentOver: false
            },
            match: {
                playerOne: null,
                playerTwo: null,
                winner: '',
                isMatchOver: false,
            }
        };
        UserService.getMyInfo().then(user => this.setState({
            ...this.state,
            user,
            match: {
                ...this.state.match,
                playerOne: user.username
            },
            tournament: {
                ...this.state.tournament,
                playerList: [user.username]
            }})
        );
    }

    bind() {
        this.subscribe('local-match-registration-modal', 'START_LOCAL_MATCH', ({detail}) => {
            Sounds.startBackgroundMusic();
            this.setState({
                ...this.state,
                stop: false,
                isRegistrationOpen: false,
                match: {
                    ...this.state.match,
                    playerOne: detail.playerOne,
                    playerTwo: detail.playerTwo
                }
            });
        });

        this.subscribe('tournament-registration-modal', 'START_TOURNAMENT', ({ detail }) => {
            Sounds.startBackgroundMusic();
            this.setState({
                ...this.state,
                stop: false,
                isRegistrationOpen: false,
                tournament: {
                    ...this.state.tournament,
                    id: detail.tournamentId,
                    name: detail.name,
                    playerList: detail.players
                },
                match: {
                    ...this.state.match,
                    playerOne: detail.players[0],
                    playerTwo: detail.players[1]
                }
            });

            GameService.getTournamentInfo(detail.tournamentId)
                .then(({ current_round, current_order_round, total_order_round, total_round, players }) => {
                    this.setState({
                        ...this.state,
                        tournament: {
                            ...this.state.tournament,
                            playerList: players,
                            currentRound: current_round,
                            currentOrder: current_order_round, //0...total_order_round
                            totalOrder: total_order_round, //current_round / 2
                            totalRound: total_round,
                        },
                        /*match: {
                            ...this.state.match,
                            playerOne: players[current_order_round],
                            playerTwo: players[current_order_round + 1]
                        }*/
                    });
                });
        }
        );

        this.subscribe('app-game', 'FINISH_GAME', ({ detail }) => {
            let newCurrentOrder = this.state.tournament.currentOrder + 1;
            let newCurrentRound = this.state.tournament.currentRound;
            let newTotalOrder = this.state.tournament.totalOrder;
            if (newCurrentOrder > this.state.tournament.totalOrder) {
                newCurrentOrder = 1;
                //Delete losers
                newTotalOrder = this.state.tournament.playerList.length / 2;
                newCurrentRound = this.state.tournament.currentRound + 1;
            }
            this.setState({
                ...this.state,
                stop: true,
                match: {
                    isMatchOver: true,
                    winner: detail.winner,
                },
                tournament: {
                    ...this.state.tournament,
                    currentOrder: newCurrentOrder,
                    currentRound: newCurrentRound,
                    totalOrder: newTotalOrder,
                    isTournamentOver: newCurrentRound > this.state.tournament.totalRound
                }
            });
        });
    }

    render() {
        return `
            <section style="height: calc(100vh - 40px);">
                ${this.state.isTournament ? `<tournament-registration-modal
                    open="${this.state.isRegistrationOpen}"
                    userId="${this.state.user?.id}"
                    username="${this.state.user?.username}">
                </tournament-registration-modal>` : `<local-match-registration-modal
                    open="${this.state.isRegistrationOpen}"
                    userId="${this.state.user?.id}"
                    playerOne="${this.state.user?.username}">
                </local-match-registration-modal>`}
                ${this.state.match.isMatchOver ? `
                <winner-modal
                    finishGame="${!this.state.isTournament && this.state.isMatchOver}"
                    isTournamentLastRound="${this.state.isTournament && this.state.tournament.isTournamentOver}"
                    name="${this.state.tournament.name}"
                    winner="${this.state.match.winner}"
                > </winner-modal>` : ''}
                <app-game
                    [isStopped]="state.stop"
                    userId="${this.state.user?.id}"
                    username="${this.state.user?.username}"
                    playerOne="${this.state.match.playerOne}"
                    playerTwo="${this.state.match.playerTwo}"
                    profileImg="${this.state.user?.profile_img}">
                </app-game>
            </section>
        `;
    }
});