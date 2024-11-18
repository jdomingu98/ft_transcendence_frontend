import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import UserService from '#services/UserService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-sidebar'
},
class PongSidebar extends WebComponent {

    get winnerModal() {
        return this._getDOM().querySelector('winner-modal');
    }


    init() {
        this.state = {
            isTournament: window.location.pathname.includes('tournament'),
            inPause: true,
            user: {},
            tournament:  {
                id: 0,
                name: '',
                playerList: [],
                currentRound: 1,
                currentOrder: 1,
                totalOrder: 1,
                totalRounds: 1,
                haveWinner: false
            },
            playerOne: null,
            playerTwo: null,
            winnerName: null,
            isMatchOver: false
        };
        UserService.getMyInfo().then(user => this.setState({
            ...this.state,
            user,
            playerOne: user.username,
            tournament: {
                ...this.state.tournament,
                playerList: [user.username]
            }})
        );
    }

    bind() {
        this.subscribe('local-match-registration-modal', 'START_LOCAL_MATCH',
            ({ detail: { playerOne, playerTwo } }) => {
                this.setState({ ...this.state, playerOne, playerTwo, inPause: false });
            });
        this.subscribe('tournament-registration-modal', 'START_TOURNAMENT', ({ detail }) => {
            this.setState({
                ...this.state,
                inPause: false,
                playerOne: detail.players[0],
                playerTwo: detail.players[1],
                tournament: {
                    ...this.state.tournament,
                    id: detail.tournamentId,
                    name: detail.name,
                    playerList: detail.players
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
                            currentOrder: current_order_round,
                            totalOrder: total_order_round,
                            totalRounds: total_round,
                            haveWinner: current_round > total_round
                        }
                    });
                });
        }
        );

        this.subscribe('app-game', 'FINISH_GAME', ({ detail: {winner} }) => {
            this.setState({
                ...this.state,
                inPause: true,
                isMatchOver: true,
                winnerName: winner,
                tournament: {
                    ...this.state.tournament,
                    haveWinner: true,
                }
            });
            this.winnerModal.showModal();
        });
    }

    render() {
        return `
            <section style="height: calc(100vh - 40px);">
                ${this.state.isTournament ? `<tournament-registration-modal
                    [userId]="state.user?.id"
                    [username]="state.user?.username"
                    [playerList]="state.tournament.playerList">
                </tournament-registration-modal>` : `<local-match-registration-modal
                    [userId]="state.user?.id"
                    [playerOne]="state.user?.username">
                </local-match-registration-modal>`}
                <winner-modal
                    [isTournamentLastRound]="state.isTournament && state.tournament.haveWinner"
                    [isSimpleMatchOver]="!state.isTournament && state.isMatchOver"
                    [tournamentName]="state.name"
                    [winner]="state.winnerName">
                </winner-modal>
                <!-- Si no pongo la condicion no se pasa playerTwo -->
                ${ this.state.playerOne && this.state.playerTwo ? `<app-game
                    [isPaused]="state.inPause"
                    [userId]="state.user?.id"
                    [playerOne]="state.playerOne"
                    [playerTwo]="state.playerTwo"
                    [profileImg]="state.user?.profile_img"></app-game>` : '' }
            </section>
        `;
    }
});