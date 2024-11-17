import WebComponent, { Component } from '#WebComponent';
//import GameService from '#services/GameService';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'local-match-registration-modal',
    styleCSS: css
},
class LocalMatchRegistrationModal extends WebComponent {

    userId = this.getAttribute('userId');
    playerOne = this.getAttribute('playerOne') ?? '';

    init() {
        this.state = {
            playerTwo: '',
            isOpen: true
        };
    }

    get modal() {
        return this._getDOM().querySelector('#localMatchRegistrationModal');
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
            this.markAsError('Please fill in correctly both player aliases');
            return;
        }

        if (this.playerOne === playerTwo) {
            this.markAsError('Player aliases must be different');
            return;
        }

        /*GameService.checkPlayersData({player_one: playerOne, player_two: playerTwo})
            .then(() => this.emit('START_LOCAL_MATCH', { playerOne, playerTwo }))
            .catch( e => this.markAsError(e.error[0]));*/

        this.emit('START_LOCAL_MATCH', { playerOne: this.playerOne, playerTwo });
        this.closeModal();
    }

    closeModal() {
        this.modal.classList.remove('open');
        if (this.state.isOpen)
            this.setState({...this.state, isOpen: false});
    }

    showModal() {
        this.modal.classList.add('open');
        if (!this.state.isOpen)
            this.setState({...this.state, isOpen: true});
    }

    bind() {
        this.subscribe('#player-one', 'input', ({target}) => this.playerOne = target?.value.trim());
        this.subscribe('#player-two', 'input', ({target}) => this.setState({...this.state, playerTwo: target?.value.trim()}));
        this.subscribe('button', 'click', () => this.startGame());
        if (this.modal && this.state.isOpen)
            this.showModal();
    }

    render() {
        return `
            <div class="game-body">
                <div id="localMatchRegistrationModal" class="game-modal">
                    <div class="container text-white">
                        <h2>TRANSCENDENCE</h2>
                        <h3>NEW LOCAL MATCH</h3>
                        <p class="error-message hidden"></p>
                        <div class="my-4" style="width: 85%;">
                            <h4>FIRST PLAYER ALIAS</h4>
                            <input type="text" id="player-one" minlength="3" maxlength="20" ${this.userId ? 'disabled' : ''} [value]="playerOne" placeholder="Alias 1" required>
                        </div>
                        <div class="my-4" style="width: 85%;">
                            <h4>SECOND PLAYER ALIAS</h4>
                            <input type="text" id="player-two" minlength="3" maxlength="20" placeholder="Alias 2" required>
                        </div>
                        <button class="primary-btn mt-4" style="width: 85%;">Start game</button>
                    </div>
                </div>
            </div>
        `;
    }
});