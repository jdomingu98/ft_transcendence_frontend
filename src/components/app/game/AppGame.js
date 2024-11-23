import { Game, PaddleTypes } from './models/Game';
import { Sounds, timerDisplay} from './PongUtils';
import WebComponent, { Component } from '#WebComponent';
import { BallDirection } from './models/Ball';
import GameService from '#services/GameService';
import { SnackbarService } from '#services/SnackbarService';
import css from './AppGame.css?inline';

export const KEY_ARROW_UP = 38;
export const KEY_ARROW_DOWN = 40;
export const KEY_W = 87;
export const KEY_S = 83;
const KEY_SPACE = 32;

const INITIAL_REMAINING_TIME = 300; // seconds

export default Component ({
    tagName: 'app-game',
    styleCSS: css
},
class AppGame extends WebComponent {

    init() {
        this.state = {
            players: this.getRandomPlayers(),
        };
    }

    getRandomPlayers() {
        const images = [
            {src: '/src/resources/players/image0.png', name: 'Crazy dev'},
            {src: '/src/resources/players/image1.png', name: 'Awesome grandma'},
            {src: '/src/resources/players/image2.png', name: 'Jonathan'},
            {src: '/src/resources/players/image3.png', name: 'Fat cat'},
        ];
        return images.sort(() => Math.random() - 0.5).slice(0, 2);
    }

    timerInterval = null;

    stopGameLoop = false;

    get playerOne() {
        return this.getAttribute('playerOne') ?? this.state.players[0].name;
    }

    get playerTwo() {
        return this.getAttribute('playerTwo') ?? this.state.players[1].name;
    }

    get userId() {
        return this.getAttribute('userId');
    }

    get username() {
        return this.getAttribute('username');
    }

    get btnPause() {
        return this._getDOM().querySelector('.pause');
    }

    get btnPlay() {
        return this._getDOM().querySelector('.play');
    }

    get backgroundPause() {
        return this._getDOM().querySelector('.background-pause');
    }

    get isStopped() {
        return this.getAttribute('isStopped');
    }

    /**
     * @param {HTMLElement} btnPause - The button used to pause the game.
     * @description Resumes the game, hides the pause background, and changes the pause state.
     */
    togglePause(pause) {
        if (pause) {
            this.score.forEach(score => score.style.opacity = 0.5);
            this.isPause = true;
            this.btnPause.classList.remove('hidden');
            this.backgroundPause.classList.remove('hidden');
            this.btnPlay.classList.add('hidden');
        } else {
            this.score.forEach(score => score.style.opacity = 0.85);
            this.isPause = false;
            this.btnPause.classList.add('hidden');
            this.backgroundPause.classList.add('hidden');
            this.btnPlay.classList.remove('hidden');
        }
    }

    /**
     * Starts the Golden Goal mode.
     */
    setGoldenGoalMode() {
        this.game.setGoldenGoal();
        this._getDOM().querySelector('.golden-goal').style.display = 'inline-block';
    }

    /**
     * @description Starts the timer for the game, decrementing the time every second and updating the display.
     */
    startTimer() {
        if (!this.timerInterval) {
            this.timerInterval = setInterval(() => {
                if (!this.isPause) {
                    if (this.remainingTime > 0) {
                        this.remainingTime--;
                        // Update the timer display.
                        this._getDOM().querySelector('#timer-marker').textContent = timerDisplay(this.remainingTime);
                    } else {
                        clearInterval(this.timerInterval);
                        if (this.game.isTie()) this.setGoldenGoalMode();
                        else this.finishGame();
                    }
                }
            }, 1000);
        }
    }

    /**
     * @param {number} id - The user's ID.
     * @param {string} username - The user's username.
     * @returns {Object} The data object containing the game information.
     * @description Creates a data object with the game information to send to the server.
     */
    getData(id, username) {
        const paddle = this.game.getPaddles();
        return ({
            user: id,
            user_a: username,
            user_b: this.playerTwo,
            num_goals_scored: paddle.left.getScore(),
            num_goals_against: paddle.right.getScore(),
            num_goals_stopped_a: paddle.left.getGoalsStopped(),
            num_goals_stopped_b: paddle.right.getGoalsStopped(),
            start_date: this.game.getStartDate().toISOString().slice(0, 19),
            time_played: INITIAL_REMAINING_TIME - this.remainingTime
        });
    }

    /**
     * @description Initializes the game, setting up the context, keyboard input, and the initial state of the game.
     */
    initGame() {
        this.ctx = this.canvas.getContext('2d');
        this.keysPressed = new Map();
        this.game = new Game(this.canvas);
    }

    /**
     * @description Ends the game, clearing the timer interval and displaying the final score.
     */
    finishGame() {
        const winner = this.game.finishGame() === PaddleTypes.LEFT ? this.playerOne : this.playerTwo;
        this.togglePause(true);
        this.emit('FINISH_GAME', { winner });
        if (localStorage.getItem('access_token')) {
            GameService.storeMatch(this.getData(this.userId, this.playerOne))
                .catch(() => SnackbarService.addToast({
                    title: this.translator.translate('SNACKBAR.LOCAL_MATCH.ERROR_SENDING_DATA.TITLE'),
                    body: this.translator.translate('SNACKBAR.LOCAL_MATCH.ERROR_SENDING_DATA.DESC')
                }));
        }
    }

    /**
     * @param {number} deltaTime - The time difference between frames to smooth the movement.
     * @description Handles the core game logic, including updating the score, moving paddles, and checking for collisions.
     */
    gameMovement(deltaTime) {
        const scoring = this.game.checkScore();
        if (scoring) {
            const scoringElement = scoring.position === BallDirection.RIGHT ? '#score-1' : '#score-2';
            this._getDOM().querySelector(scoringElement).innerHTML = scoring.paddle.getScore();
            if (this.game.hasFinished()) this.finishGame();
        }
        this.game.move(deltaTime, this.keysPressed);
    }

    /**
     * @param {number} time - The current timestamp provided by requestAnimationFrame.
     * @description The main game loop, which repeats every frame to update the game state and render the scene.
     */
    gameLoop(time) {
        if (!this.lastTime) this.lastTime = time;
        const deltaTime = (time - this.lastTime) / 1000;
        this.lastTime = time;
        if (!this.isPause) {
            this.gameMovement(deltaTime);
            this.game.render();
        }
        requestAnimationFrame((time) => this.stopGameLoop || this.gameLoop(time));
    }

    afterViewInit() {
        this.canvas = this._getDOM().querySelector('.pongCanvas');
        if (this.canvas) {
            this.score = this._getDOM().querySelectorAll('.score');
            this.isPause = true;
            this.remainingTime = INITIAL_REMAINING_TIME;
            this.lastTime = 0;
            this.initGame();
            this.startTimer();
            requestAnimationFrame(time => this.gameLoop(time));
        }
    }

    getHeader(playerOneImg, playerTwoImg) {
        return `
            <div class="d-flex justify-content-between align-items-center mb-3 mb-lg-1 text-white">
                <div class="player-icon d-flex justify-content-start align-items-center gap-4 mx-lg-5 mx-3">
                    <img src="${playerOneImg}" alt="Player 1 image">
                    <span class="mt-3">${this.playerOne}</span>
                </div>
                <div class="info-mid">
                    <span id="timer-marker">05:00</span>
                </div>
                <div class="player-icon d-flex justify-content-end align-items-center gap-4 mx-lg-5 mx-3">
                    <span class="mt-3">${this.playerTwo}</span>
                    <img src="${playerTwoImg}" alt="Player 2 image">
                </div>
            </div>
        `;
    }
    bind() {
        this.subscribeAll('.btn-game', 'click', e => {
            e.preventDefault();
            if (this.isStopped) return;
            this.togglePause(!this.isPause);
        });
        this.subscribeAll('.btn-game', 'mousedown', e => e.preventDefault());

        this.subscribe(window, 'keydown', e => {
            if (this.isStopped) return;
            this.keysPressed.set(e.keyCode, true);
        });
        this.subscribe(window, 'keyup', e => {
            if (this.isStopped) return;
            this.keysPressed.set(e.keyCode, false);
            if (e.keyCode === KEY_SPACE) this.togglePause(!this.isPause);
        });
        this.subscribe(window, 'resize', () => {
            if (this.isStopped) return;
            this.game.resetPaddles();
            this.game.render();
        });
    }

    onDestroy() {
        this.keysPressed.clear();
        if (this.timerInterval)
            clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.stopGameLoop = true;
        Sounds.stopBackgroundMusic();
    }

    render() {
        const profileImg = this.getAttribute('profileImg') /*?? this.state.players[0].src*/;
        const userIsPlayerOne = this.username === this.playerOne;
        const userIsPlayerTwo = this.username === this.playerTwo;
        return `
            <div class="d-flex justify-content-center align-items-center overflow-hidden">
                <div class="pongtainer">
                    ${ this.getHeader( userIsPlayerOne ? profileImg : this.state.players[0].src, userIsPlayerTwo ? profileImg : this.state.players[1].src)}
                    <div class="position-relative">
                        <div class="background-pause hidden position-absolute top-50 start-50 translate-middle"></div>
                        <div class="golden-goal">
                            <span>GOLDEN GOAL</span>
                        </div>
                        <div class="d-flex justify-content-around align-items-center score-board position-absolute start-50 translate-middle">
                            <span class="score" id="score-1">0</span>
                            <button class="position-absolute top-50 start-50 translate-middle btn-game pause hidden">
                                <i class="bi bi-pause"></i>
                            </button>
                            <button class="position-absolute top-50 start-50 translate-middle btn-game play">
                                <i class="bi bi-play-fill"></i>
                            </button>
                            <span class="score" id="score-2">0</span>
                        </div>
                        <canvas class="pongCanvas" width="1920" height="1080"></canvas>
                    </div>
                </div>
            </div>
        `;
    }
});