import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';
import { Sounds } from '/src/components/app/game/PongUtils';
import UserService from '#services/UserService';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-sidebar'
},
class PongSidebar extends WebComponent {

    init() {
        this.state = {
            stop: true,
            isRegistrationOpen: true,
            user: {},
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
        UserService.getMyInfo().then(user => this.setState({ ...this.state, user, playerOne: user.username }));
    }

    bind() {
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

    render() {
        return `
            <section style="height: calc(100vh - 40px);">
                <local-match-registration-modal
                    [open]="state.isRegistrationOpen"
                    [userId]="state.user?.id"
                    [playerOne]="state.user?.username">
                </local-match-registration-modal>
                ${this.state.isMatchOver ? `
                    <winner-modal [winner]="state.winner" [config]="state.winnerModalConfig"></winner-modal>
                ` : ''}
                <app-game
                    [isStopped]="state.stop"
                    [userId]="state.user?.id"
                    [username]="state.user?.username"
                    [playerOne]="state.playerOne"
                    [playerTwo]="state.playerTwo"
                    [profileImg]="state.user?.profile_img"
                    [numGoalsScored]="state.numGoalsScored"
                    [numGoalsAgainst]="state.numGoalsAgainst"
                    >
                </app-game>
            </section>
        `;
    }
});