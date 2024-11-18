import WebComponent, { Component } from '#WebComponent';
import GameService from '#services/GameService';
import css from './common-modal-styles.css?inline';

export default Component({
    tagName: 'tournament-registration-modal',
    styleCSS: css
},
class TournamentRegistrationModal extends WebComponent {

    userId = this.getAttribute('userId');
    username = this.getAttribute('username') ?? '';
    playerList = this.getAttribute('playerList') ?? [];
    name = '';

    init() {
        this.state = {
            playerList: this.getAttribute('playerList') ?? [],
            isOpen: true
        };
    }

    get modal() {
        return this._getDOM().getElementById('tournamentRegistrationModal');
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

    cleanInputs(errorMessage) {
        const inputs = this._getDOM().querySelectorAll('input');
        inputs.forEach(input => input.classList.remove('input-error'));
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');
    }

    hasDuplicates() {
        const uniqueItems = new Set(this.state.playerList);
        return uniqueItems.size !== this.state.playerList.length;
    };

    isPowerOfTwo() {
        const length = this.state.playerList.length;
        return length >= 2 && length <= 32 && (length & (length - 1)) === 0;
    }

    markAsError(field, message) {
        const errorMessage = this._getDOM().querySelector('.error-message');

        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        field.classList.add('input-error');
    }

    startTournament() {
        const playerListDiv = this._getDOM().getElementById('player-list-container');
        const nameInput = this._getDOM().getElementById('tournament-name');
        const errorMessage = this._getDOM().querySelector('.error-message');

        playerListDiv.classList.remove('input-error');
        nameInput.classList.remove('input-error');
        errorMessage.textContent = '';
        errorMessage.classList.add('hidden');

        if (!this.name || this.name.length <= 0 || this.name.length > 30) {
            this.markAsError(nameInput, 'Please fill correctly the tournament name');
            return;
        }

        if (this.hasDuplicates()) {
            this.markAsError(playerListDiv, 'Player aliases must be different');
            return;
        }

        if (!this.isPowerOfTwo() || this.state.playerList.length < 2 || this.state.playerList.length > 32) {
            this.markAsError(playerListDiv, 'The number of players must be a power of between 2 and 32');
            return;
        }

        GameService.createTournament({ name: this.name, players: this.state.playerList, user_id: this.userId })
            .then(tournament => {
                this.emit('START_TOURNAMENT', {name: this.name, players: tournament.players, tournamentId: tournament.id});
                this.closeModal();
            })
            .catch(e => e && this.markAsError(playerListDiv, e.error[0]));
    }

    addPlayer() {
        const playerListInput = this._getDOM().getElementById('player-list-input');
        const playerName = playerListInput?.value.trim();

        if (!playerName || playerName.length < 3 || playerName.length > 20) return;
        this.state.playerList.push(playerName);
        playerListInput.value = '';

        this.setState({
            ...this.state,
            playerList: [...this.state.playerList] // Crear una nueva referencia para el array
        });
    }

    deletePlayer(id) {
        const playerIndex = this.state.playerList.indexOf(id);
        this.state.playerList.splice(playerIndex, 1);
    }

    mapPlayerList() {
        return `
        <ul id="player-list" style="list-style: none;">
            ${this.state.playerList?.map((player, index) => this.userId && index === 0 ?
        `<li>${player}</li>` :
        `<li>${player}<i id="${index}" class="bi bi-x me-4 fw-bolder delete-icon"></i></li>`).join('')}
        </ul>
    `;
    }

    bind() {
        this.subscribe('#tournament-name', 'input', ({ target }) => this.name = target.value?.trim());
        this.subscribeAll('delete-icon', 'click', ({ target }) => this.deletePlayer(target.id));
        this.subscribe('#add-player', 'click', () => this.addPlayer());
        this.subscribe('#start', 'click', () => this.startTournament());
        this.subscribeAll('player-list-container', 'change', () => this.mapPlayerList());
        if (this.modal && this.state.isOpen)
            this.showModal();
    }

    render() {
        return `
            <div class="game-body">
                <div id="tournamentRegistrationModal" class="game-modal">
                    <div class="container text-white">
                        <h2>TRANSCENDENCE</h2>
                        <h3>NEW TOURNAMENT</h3>
                        <p class="error-message hidden"></p>
                        <div style="width: 85%;">
                            <h4>NAME</h4>
                            <input type="text" id="tournament-name" maxlength="30" placeholder="Tournament name" required>
                        </div>
                        <div class="my-4" style="width: 85%;">
                            <h4>PARTICIPANTS</h4>
                            <div class="w-100 d-flex justify-content-space-evenly align-items-center" style="height: 40px">
                                <input type="text" id="player-list-input" minlength="3" maxlength="20" placeholder="Add new player">
                                <button id="add-player" class="primary-btn-alt ms-2 text-center" style="width: 80px;">
                                    <i class="bi bi-person-fill-add" style="font-size: 1rem;"></i>
                                </button>
                            </div>
                        </div>
                        <div id="player-list-container" class="app-textarea" style="width: 85%;">
                            ${this.mapPlayerList()}
                        </div>
                        <button id="start" class="primary-btn mt-4" ${this.isPowerOfTwo() ? '' : 'disabled'} style="width: 85%;">Start tournament</button>
                    </div>
                </div>
            </div>
        `;
    }
});