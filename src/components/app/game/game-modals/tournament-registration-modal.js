import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'tournament-registration-modal',
    styleCSS: css
},
class TournamentRegistrationModal extends WebComponent {

    init() {
        this.state = {
            userId: this.getAttribute('userId'),
            username: this.getAttribute('username') ?? '',
            name: '',
            playerList: [],
        };

        if (this.state.username) {
            this.state.playerList.push(this.state.username);
        }
    }

    cleanInputs(errorMessage) {
        const inputs = this._getDOM().querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('input-error'));
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }

    openModal() {
        const modal = this._getDOM().getElementById('tournamentRegistrationModal');
        modal.showModal();
    }

    hasDuplicates(list) {
        const uniqueItems = new Set(list);
        return uniqueItems.size !== list.length;
    };

    isPowerOfTwo() {
        const number = this.state.playerList.length;
        return number >= 2 && number <= 32 && (number & (number - 1)) === 0;
    }

    markAsError(message) {
        const playerListDiv = this._getDOM().getElementById('player-list-container');
        const errorMessage = this._getDOM().querySelector('.error-message');

        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        playerListDiv.classList.add('input-error');
    }

    startTournament() {
        const playerListDiv = this._getDOM().getElementById('player-list-container');
        const errorMessage = this._getDOM().querySelector('.error-message');

        playerListDiv.classList.remove('input-error');
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        if (!this.state.name || this.state.name.length <= 0 || this.state.name.length > 30) {
            this.markAsError('Please fill in the tournament name');
            return;
        }

        if (this.hasDuplicates()) {
            this.markAsError('Player aliases must be different');
            return;
        }

        if (!this.isPowerOfTwo() || this.state.playerList.length < 2 || this.state.playerList.length > 32) {
            this.markAsError('The number of players must be a power of between 2 and 32');
            return;
        }

        const { name, playerList, userId } = this.state;

        GameService.createTournament({ name, players: playerList, user_id: userId })
            .then(({players}) => this.emit('START_TOURNAMENT', players))
            .catch(e => e && this.markAsError(e.error[0]));
    }

    addPlayer() {
        const playerListInput = this._getDOM().getElementById('player-list-input');
        const playerName = playerListInput?.value.trim();
        const listElem = this._getDOM().getElementById('player-list');

        if (!playerName || playerName.length < 3 || playerName.length > 20) return;
        this.setState({...this.state, playerList: this.state.playerList.push(playerName)});
        playerListInput.value = '';

        const li = document.createElement('li');
        li.textContent = playerName;
        li.id = playerName + '-' + this.state.playerList.length;
        const deleteIcon = document.createElement('i');
        deleteIcon.classList.add('bi', 'bi-x', 'me-4', 'fw-bolder');
        deleteIcon.addEventListener('click', () => this.deletePlayer(li.id));
        li.appendChild(deleteIcon);
        listElem.appendChild(li);
    }

    deletePlayer(id) {
        const playerContainer = this._getDOM().getElementById('player-list');
        const players = [...this._getDOM().querySelectorAll('li')];
        const playerToDelete = players.find(player => player.id === id);
        const playerIndex = players.indexOf(playerToDelete);

        if (playerToDelete) {
            playerContainer.removeChild(playerToDelete);
            this.setState({...this.state, playerList: this.state.playerList.splice(playerIndex, 1)});
        }
    }

    bind() {
        this.subscribe('#tournament-name', 'input', ({ target }) => this.setState({...this.state, name: target?.value.trim()}));
        this.subscribe('#add-player', 'click', () => this.addPlayer());
        this.subscribe('#start', 'click', () => this.startTournament());
    }

    render() {
        return `
            <div class="game-body">
                <dialog open id="tournamentRegistrationModal" class="game-modal">
                    <div class="container text-white">
                        <h2>TRANSCENDENCE</h2>
                        <h3>NEW TOURNAMENT</h3>
                        <p class="error-message hidden"></p>
                        <div style="width: 85%;">
                            <h4>NAME</h4>
                            <input type="text" id="tournament-name" maxlength="30" placeholder="Tournament name" required>
                        </div>
                        <div class="my-4" style="width: 85%;">
                            <h4>PLAYERS</h4>
                            <div class="w-100 d-flex justify-content-space-evenly align-items-center" style="height: 40px">
                                <input type="text" id="player-list-input" minlength="3" maxlength="20" placeholder="Add new player">
                                <button id="add-player" class="primary-btn-alt ms-2 text-center" style="width: 80px;">
                                    <i class="bi bi-person-fill-add" style="font-size: 1rem;"></i>
                                </button>
                            </div>
                        </div>
                        <div id="player-list-container" class="app-textarea" style="width: 85%;">
                            <ul id="player-list" style="list-style: none;">
                                ${this.state.username ? `<li>${this.state.username}</li>` : ''}
                            </ul>
                        </div>
                        <button id="start" class="primary-btn mt-4" ${this.isPowerOfTwo ? 'disabled': ''} style="width: 85%;">Start tournament</button>
                    </div>
                </dialog>
            </div>
        `;
    }
});