import '/src/components/app/profile';
import WebComponent, { Component } from '#WebComponent';
import {ballPaddleCollision,drawFieldLine, timerDisplay} from './PongUtils';
import Ball from './Ball';
import GameService from '#services/GameService';
import Paddle from './Paddle';
import { SnackbarService } from '#services/SnackbarService.js';
import UserService from '#services/UserService.js';
import css from './AppGame.css?inline';

const KEY_ARROW_UP = 38;
const KEY_ARROW_DOWN = 40;
const KEY_W = 87;
const KEY_S = 83;

const MIN_PADDLE_WIDTH = 35;
const MAX_PADDLE_WIDTH = 45;
const MIN_PADDLE_HEIGHT = 240;
const MAX_PADDLE_HEIGHT = 285;
const INITIAL_REMAINING_TIME = 300;
const MAX_GOALS = 7;

export default Component({
    tagName: 'app-game',
    styleCSS: css
},
class AppGame extends WebComponent {

    init() {
        this.state = {
            isTournament: window.location.pathname.includes('tournament'),
            user: {},
            playerOne: '',
            playerTwo: null
        };
        UserService.getMyInfo().then(user => this.setState({ ...this.state, user, playerOne: user.username }));
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

    /**
     * @description Initializes the paddles and ball with their respective positions and dimensions.
     */
    createElements() {
        const ballRadius = 20;
        this.paddle1 = new Paddle(this.paddlePosX, this.paddlePosY, this.paddleWidth, this.paddleHeight, this.canvas.width);
        this.paddle2 = new Paddle(this.canvas.width - this.paddleWidth - this.paddlePosX, this.paddlePosY, this.paddleWidth, this.paddleHeight, this.canvas.width, '#ABD9D9');
        this.ball = new Ball(this.canvas.width / 2, this.canvas.height / 2, ballRadius, this.canvas.width, this.canvas.clientWidth);
    }

    /**
     * @description Adjusts the dimensions and positions of the paddles based on the current canvas size.
     * Ensures that paddles don't exceed certain minimum and maximum sizes.
     */
    setDataElements() {
        this.paddleWidth = Math.max(MIN_PADDLE_WIDTH, Math.min(this.canvas.clientWidth * 0.016, MAX_PADDLE_WIDTH));
        this.paddleHeight = Math.max(MIN_PADDLE_HEIGHT, Math.min(this.canvas.clientHeight * 0.5, MAX_PADDLE_HEIGHT));
        this.paddlePosX = this.canvas.width * 0.05;
        this.paddlePosY = (this.canvas.height - this.paddleHeight) / 2;
    }

    /**
     * @description Recalculates the positions and dimensions of the paddles and ball, and redraws the game field.
     */
    updateElements() {
        this.setDataElements();
        this.paddle1.set(this.paddleWidth, this.paddleHeight, this.paddlePosX, this.paddlePosY);
        this.paddle2.set(this.paddleWidth, this.paddleHeight, this.canvas.width - this.paddleWidth - this.paddlePosX, this.paddlePosY);
        // Adjust the ball's angle based on the canvas width.
        this.canvas.clientWidth > 650 ? this.ball.set_angle(50) : this.ball.set_angle(20);
        this.paint();
    }

    /**
     * @description Clears the canvas and redraws the game field, paddles, and ball at their current positions.
     */
    paint() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        drawFieldLine(this.ctx, this.canvas.width, this.canvas.height);
        this.paddle1.render(this.ctx);
        this.paddle2.render(this.ctx);
        this.ball.render(this.ctx, this.canvas.clientWidth);
    }

    /**
     * @param {HTMLElement} btnPause - The button used to pause the game.
     * @description Resumes the game, hides the pause background, and changes the pause state.
     */
    togglePause(pause) {
        this.pause = pause;
        if (this.isPause) {
            this.score.forEach(score => score.style.opacity = 0.85);
            this.isPause = false;
            this.btnPause.classList.add('hidden');
            this.backgroundPause.classList.add('hidden');
            this.btnPlay.classList.remove('hidden');
        } else {
            this.score.forEach(score => score.style.opacity = 0.5);
            this.isPause = true;
            this.btnPause.classList.remove('hidden');
            this.backgroundPause.classList.remove('hidden');
            this.btnPlay.classList.add('hidden');
        }
    }


    /**
     * @description Checks if the ball has crossed the boundaries of the field, assigns the score to the appropriate paddle,
     * and respawns the ball at the center.
     */
    upScore() {
        let scoringPaddle, scoringElement, direction;

        if (this.ball.x >= this.canvas.width) {
            scoringPaddle = this.paddle1;
            scoringElement = '#score-1';
            direction = 1;
        } else if (this.ball.x - this.ball.radius <= 0) {
            scoringPaddle = this.paddle2;
            scoringElement = '#score-2';
            direction = -1;
        } else {
            return;
        }
        this.ball.respawnBall(this.canvas.width, this.canvas.height, direction);
        scoringPaddle.score++;
        if(scoringPaddle.score >= MAX_GOALS) this.finishGame();
        this._getDOM().querySelector(scoringElement).innerHTML = scoringPaddle.score;
        this.paddle1.reset();
        this.paddle2.reset();
    }

    /**
     *@description Fucntion that starts the golden goal mode.
     */
    golden_goal(){
        clearInterval(this.timerInterval);
        const golden_goal_title = this._getDOM().querySelector('.golden-goal');
        const max_goals_draw = this.paddle1.score;
        golden_goal_title.style.display = 'inline-block';
        this.ball.set_color_ball('#FFD700');
        this.checkGoldenGoal(max_goals_draw);
    }

    /**
     * @description Function that checks if the game is in golden goal mode.
     * @param {number} goals_draw - The number of goals scored when the match was a draw.
     */
    checkGoldenGoal(goals_draw) {
        this.goldenGoalInterval = setInterval(() => {
            if (this.paddle1.score > goals_draw || this.paddle2.score > goals_draw) {
                clearInterval(this.goldenGoalInterval);
                this.finishGame();
            }
        }, 100);
    }


    /**
     * @description Starts the timer for the game, decrementing the time every second and updating the display.
     */
    startTimer() {
        this.timerInterval = setInterval(() => {
            if (!this.isPause) {
                if (this.remainingTime > 0) {
                    this.remainingTime--;
                    // Update the timer display.
                    this._getDOM().querySelector('#timer-marker').textContent = timerDisplay(this.remainingTime);
                } else {
                    if(this.paddle1.score === this.paddle2.score){
                        this.golden_goal();
                    }
                    else this.finishGame();
                }
            }
        }, 1000);
    }

    /**
     * @param {Paddle} paddle - The paddle to move (either paddle1 or paddle2).
     * @param {number} upKey - The key code for moving the paddle up.
     * @param {number} downKey - The key code for moving the paddle down.
     * @param {number} deltaTime - The time difference between frames to smooth the movement.
     * @description Moves the paddle up or down based on the keys pressed and smooths the movement based on deltaTime.
     */
    move(paddle, upKey, downKey, deltaTime) {
        if (this.keysPressed.get(upKey)) {
            paddle.move(-1, this.canvas.height, deltaTime);
        }
        if (this.keysPressed.get(downKey)) {
            paddle.move(1, this.canvas.height, deltaTime);
        }
    }

    /**
     * @param {number} id - The user's ID.
     * @param {string} username - The user's username.
     * @returns {Object} The data object containing the game information.
     * @description Creates a data object with the game information to send to the server.
     */
    getData(id, username) {
        const startDate = this.startDate.toISOString().slice(0, 19);
        return ({
            user: id,
            user_a: username,
            user_b: 'Pepe',
            num_goals_scored: this.paddle1.score,
            num_goals_against: this.paddle2.score,
            num_goals_stopped_a: this.paddle1.goals_stopped,
            num_goals_stopped_b: this.paddle2.goals_stopped,
            start_date: startDate,
            time_played: INITIAL_REMAINING_TIME - this.remainingTime
        });
    }

    /**
     * @description Initializes the game, setting up the context, keyboard input, and the initial state of the game.
     */
    initGame() {
        this.ctx = this.canvas.getContext('2d');
        this.keysPressed = new Map();
        this.setDataElements();
        this.createElements();
    }

    /**
     * @description Ends the game, clearing the timer interval and displaying the final score.
     */
    finishGame() {
        this.togglePause(true);
        if (localStorage.getItem('access_token')) {
            UserService.getMyInfo()
                .then(({ id, username }) => GameService.saveMatch(this.getData(id, username)))
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
        this.upScore();
        this.move(this.paddle1, KEY_W, KEY_S, deltaTime);
        this.move(this.paddle2, KEY_ARROW_UP, KEY_ARROW_DOWN, deltaTime);
        this.ball.move(this.canvas.height, deltaTime);
        ballPaddleCollision(this.ball, this.paddle1);
        ballPaddleCollision(this.ball, this.paddle2);
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
            this.paint();
        }
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    /**
     * @description Initializes the game after the DOM is ready: sets up the game.
     */
    afterViewInit() {
        this.canvas = this._getDOM().querySelector('.pongCanvas');

        if (this.canvas) {
            this.score = this._getDOM().querySelectorAll('.score');
            this.timerInterval = null;
            this.isPause = true;
            this.remainingTime = INITIAL_REMAINING_TIME;
            this.lastTime = 0;
            this.startDate = new Date();
            this.initGame();
            this.startTimer();
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    getRandomPlayer() {
        const images = [
            {src: '/src/resources/players/image0.png', name: 'Crazy dev'},
            {src: '/src/resources/players/image1.png', name: 'Awesome grandma'},
            {src: '/src/resources/players/image2.png', name: 'Jonathan'},
            {src: '/src/resources/players/image3.png', name: 'Fat cat'},
        ];
        return images[Math.floor(Math.random() * images.length)];
    }

    getHeader(player) {
        return `
            <div class="d-flex justify-content-between align-items-center mb-3 mb-lg-1 text-white">
                <div class="player-icon d-flex justify-content-start align-items-center gap-4 mx-lg-5 mx-3">
                    <img [src]="state.user.profile_img" alt="Player 1 image">
                    <span class="mt-3">${ this.state.playerOne }</span>
                </div>
                <div class="info-mid">
                    <span id="timer-marker">05:00</span>
                </div>
                <div class="player-icon d-flex justify-content-end align-items-center gap-4 mx-lg-5 mx-3">
                    <span class="mt-3">${this.state?.playerTwo ?? player.name}</span>
                    <img src="${player.src}" alt="Player 2 image">
                </div>
            </div>
        `;
    }

    bind() {
        this.subscribeAll('.btn-game', 'click', () => this.togglePause(!this.isPause));
        this.subscribe(window, 'keydown', e => this.keysPressed.set(e.keyCode, true));
        this.subscribe(window, 'keyup', e => this.keysPressed.set(e.keyCode, false));
        this.subscribe(window, 'resize', () => this.updateElements());
        this.subscribe('local-match-registration-modal', 'START_LOCAL_MATCH',
            ({ detail: { playerOne, playerTwo } }) => {
                this.setState({ ...this.state, playerOne, playerTwo });
                this.isPause = false;
                this._getDOM().querySelector('local-match-registration-modal')?.closeModal();
            });
    }

    render() {
        const player = this.getRandomPlayer();
        return `
            '${this.state.isTournament ? '<tournament-registration-modal [userId]="state.user?.id" [username]="state.user?.username"></tournament-registration-modal>' : '<local-match-registration-modal [userId]="state.user?.id" [username]="state.user?.username"></local-match-registration-modal>'}
            <div class="d-flex justify-content-center align-items-center">
                <div class="pongtainer">
                    ${this.getHeader(player)}
                    <div class="position-relative">
                        <div class="background-pause hidden position-absolute top-50 start-50 translate-middle"></div>
                        <div class="golden-goal"><span>GOLDEN GOAL</span></div>
                        <div class="d-flex justify-content-around align-items-center score-board position-absolute start-50 translate-middle">
                            <span class="score" id="score-1">0</span>
                            <button class="position-absolute top-50 start-50 translate-middle btn-game pause hidden"><i class="bi bi-pause"></i></button>
                            <button class="position-absolute top-50 start-50 translate-middle btn-game play"><i class="bi bi-play-fill"></i></button>
                            <span class="score" id="score-2">0</span>
                        </div>
                        <canvas class="pongCanvas" width="1920" height="1080"></canvas>
                    </div>
                </div>
            </div>
        `;
    }
});