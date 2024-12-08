import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import { Sounds } from '/src/components/app/game/PongUtils';
import UserService from '#services/UserService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-tournament'
},
class PongTournament extends WebComponent {

    init() {
        this.state = {
            stop: true,
            isRegistrationOpen: true,
            user: {},
            tournament: {
                id: 0,
                name: '',
                players: [],
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
                over: false,
            },
            winnerModalConfig: {
                label: {
                    title: 'WINNER_MODAL.TOURNAMENT.TITLE',
                    description: 'WINNER_MODAL.TOURNAMENT.DESC',
                    button: 'WINNER_MODAL.TOURNAMENT.BUTTON',
                }
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
                players: [user.username]
            }})
        );
    }

    getNextPlayers(players) {
        const { currentOrder } = this.state.tournament;
        const playerPosition = (currentOrder - 1) * 2;
        return ({
            playerOne: playerPosition <= players.length ? players[playerPosition] : null,
            playerTwo: playerPosition <= players.length ? players[playerPosition + 1] : null
        });
    }

    bind() {
        this.subscribe('tournament-registration-modal', 'START_TOURNAMENT', ({ detail }) => {
            Sounds.startBackgroundMusic();
            const nextPlayers = this.getNextPlayers(detail.players);
            this.setState({
                ...this.state,
                isRegistrationOpen: false,
                tournament: {
                    ...this.state.tournament,
                    id: detail.tournamentId,
                    name: detail.name,
                    players: detail.players,
                },
                match: {
                    ...this.state.match,
                    playerOne: nextPlayers.playerOne,
                    playerTwo: nextPlayers.playerTwo,
                    numGoalsAgainst: 0,
                    numGoalsScored: 0,
                    over: true,
                }
            });
        });

        this.subscribe('round-modal', 'ROUND_MATCH_START', ({ detail }) => {
            const nextPlayers = this.getNextPlayers(this.state.tournament.players);
            this.setState({
                ...this.state,
                stop: false,
                match: {
                    ...this.state.match,
                    over: false,
                    numGoalsAgainst: 0,
                    numGoalsScored: 0,
                    playerOne: nextPlayers.playerOne,
                    playerTwo: nextPlayers.playerTwo,
                },
                tournament: {
                    ...this.state.tournament,
                    totalOrder: detail.totalOrderRound,
                    totalRound: detail.totalRound,
                },
            });
        });

        this.subscribe('app-game', 'FINISH_GAME', ({ detail }) => {
            const { currentOrder, totalOrder, currentRound, totalRound } = this.state.tournament;
            const endOfRound = (currentOrder + 1) > totalOrder;
            const newCurrentOrder = endOfRound ? 1 : (currentOrder + 1);
            const newCurrentRound = endOfRound ? (currentRound + 1) : currentRound;
            const endOfTournament = newCurrentRound > totalRound;
            if (endOfTournament) {
                this.endMatch(detail, { isTournamentOver: true });
            } else {
                const tournamentDetails = {
                    currentOrder: newCurrentOrder,
                    currentRound: newCurrentRound,
                    totalOrder: totalOrder,
                };
                GameService.endMatch({
                    user_a: detail.playerOne,
                    user_b: detail.playerTwo,
                    num_goals_scored: detail.numGoalsScored,
                    num_goals_against: detail.numGoalsAgainst,
                    tournamentId: this.state.tournament.id,
                }).then(matchEnd => {
                    if (endOfRound) {
                        tournamentDetails.players = matchEnd.remaining_players;
                        tournamentDetails.totalRound = matchEnd.total_order_round;
                    }
                    this.endMatch(detail, tournamentDetails);
                });
            }
        });
    }

    endMatch(matchDetails, tournamentDetails) {
        this.setState({
            ...this.state,
            stop: true,
            match: {
                over: true,
                winner: matchDetails.winner,
                playerOne: matchDetails.playerOne,
                playerTwo: matchDetails.playerTwo,
                numGoalsScored: matchDetails.numGoalsScored,
                numGoalsAgainst: matchDetails.numGoalsAgainst,
            },
            tournament: {
                ...this.state.tournament,
                ...tournamentDetails,
            }
        });
    }

    render() {
        return `
            <section style="height: calc(100vh - 40px);">
                ${this.state.isRegistrationOpen ? `
                    <tournament-registration-modal [userId]="state.user?.id" [username]="state.user?.username"></tournament-registration-modal>
                ` : ''}
                ${this.state.tournament.isTournamentOver ? `
                    <winner-modal
                        [isTournamentLastRound]="state.tournament.isTournamentOver"
                        [name]="state.tournament.name"
                        [winner]="state.match.winner"
                        [config]="state.winnerModalConfig"
                    ></winner-modal>` : ''}
                ${this.state.match.over && !this.state.tournament.isTournamentOver ? '<round-modal [tournament]="state.tournament"></round-modal>' : ''}
                <app-game
                    [isStopped]="state.stop"
                    [userId]="state.user?.id"
                    [username]="state.user?.username"
                    [playerOne]="state.match.playerOne"
                    [playerTwo]="state.match.playerTwo"
                    [profileImg]="state.user?.profile_img"
                    [numGoalsScored]="state.match.numGoalsScored"
                    [numGoalsAgainst]="state.match.numGoalsAgainst"
                    [tournament]="state.tournament"
                    >
                </app-game>
            </section>
        `;
    }
});