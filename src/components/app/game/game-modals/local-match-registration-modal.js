import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'local-match-registration-modal',
    styleCSS: css
},
class LocalMatchRegistrationModal extends WebComponent {

    userId = this.getAttribute('userId');
    playerOne = this.getAttribute('playerOne') ?? '';
    accessToken = localStorage.getItem('access_token');

    init() {
        this.state = {
            open: this.getAttribute('open') ?? true,
            playerTwo: '',
        };
    }

    cleanInputs(errorMessage) {
        const inputs = this._getDOM().querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('input-error'));
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }

    markAsError(message) {
        const playerOneInput = this._getDOM().getElementById('player-one');
        const playerTwoInput = this._getDOM().getElementById('player-two');
        const errorMessage = this._getDOM().querySelector('.error-message');

        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        playerOneInput.classList.add('input-error');
        playerTwoInput.classList.add('input-error');
    }

    startGame() {
        const playerTwo = this.state.playerTwo;
        const errorMessage = this._getDOM().querySelector('.error-message');

        this.cleanInputs(errorMessage);

        if (!this.playerOne || !playerTwo || this.playerOne.length < 3 || playerTwo.length < 3) {
            this.markAsError(this.translator.translate('ERROR.MATCH.INVALID'));
            return;
        }

        if (this.playerOne === playerTwo) {
            this.markAsError(this.translator.translate('ERROR.MATCH.EQUAL_NAMES'));
            return;
        }

        GameService.validateMatch({id: this.userId, user_a: this.playerOne, user_b: playerTwo})
            .then(() => {
                this.emit('START_LOCAL_MATCH', { playerOne: this.playerOne, playerTwo });
                this.state.open = false;
            })
            .catch( e => this.markAsError(e.error[0]));
    }

    bind() {
        this.subscribe('#player-one', 'input', ({target}) => this.playerOne = target.value.trim());
        this.subscribe('#player-two', 'input', ({target}) => this.setState({...this.state, playerTwo: target.value.trim()}));
        this.subscribe('button', 'click', () => this.startGame());
    }

    render() {
        return `
            <div class="game-body">
                <div id="localMatchRegistrationModal" class="game-modal ${!this.accessToken ? 'move-left' : ''} ${this.state.open ? 'open' : ''}">
                    <div class="container text-white">
                        <h2>TRANSCENDENCE</h2>
                        <h3>{{ translator.translate('GAME.REGISTRATION_MODAL.TITLE') }}</h3>
                        <p class="error-message hidden"></p>
                        <div class="my-4" style="width: 85%;">
                            <h4>{{ translator.translate('GAME.REGISTRATION_MODAL.FIRST_ALIAS.LABEL') }}</h4>
                            <input type="text" id="player-one" minlength="3" maxlength="20" ${this.userId ? 'disabled' : ''} [value]="playerOne" [placeholder]="translator.translate('GAME.REGISTRATION_MODAL.FIRST_ALIAS.PHOLDER')" required>
                        </div>
                        <div class="my-4" style="width: 85%;">
                            <h4>{{ translator.translate('GAME.REGISTRATION_MODAL.SECOND_ALIAS.LABEL') }}</h4>
                            <input type="text" id="player-two" minlength="3" maxlength="20" [placeholder]="translator.translate('GAME.REGISTRATION_MODAL.SECOND_ALIAS.PHOLDER')" required>
                        </div>
                        <button class="primary-btn mt-4" style="width: 85%;">{{ translator.translate('GAME.REGISTRATION_MODAL.BUTTON') }}</button>
                    </div>
                </div>
            </div>
        `;
    }
});