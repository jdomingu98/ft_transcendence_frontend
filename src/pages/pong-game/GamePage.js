import '/src/components/app/profile';
import WebComponent, { Component } from '#WebComponent';
import {ballPaddleCollision,drawFieldLine, timerDisplay} from './PongUtils';
import Ball from './Ball';
import GameService from '#services/GameService';
import Paddle from './Paddle';
import { SnackbarService } from '#services/SnackbarService.js';
import UserService from '#services/UserService.js';
import css from './GamePage.css?inline';

const KEY_O = 79;
const KEY_L = 76;
const KEY_W = 87;
const KEY_S = 83;

const MIN_PADDLE_WIDTH =35;
const MAX_PADDLE_WIDTH = 45;
const MIN_PADDLE_HEIGHT = 240;
const MAX_PADDLE_HEIGHT = 285;
const INITIAL_REMAINING_TIME = 300;
const MAX_GOALS = 2;

export default Component({
    tagName: 'game-page',
    styleCSS: css
},

class GamePage extends WebComponent {

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

    play(btnPause) {
        this.pauseBg.classList.add('hidden');
        btnPause.classList.remove('hidden');
        this.score.forEach(score => score.style.opacity = 0.85);
        this.isPause = false;
    }

    /**
     * @param {HTMLElement} btnPause - The button used to pause the game.
     * @description Pauses the game, shows the pause background, and changes the pause state.
     */

    pause(btnPause) {
        this.pauseBg.classList.remove('hidden');
        btnPause.classList.add('hidden');
        this.score.forEach(score => score.style.opacity = 0.5);
        this.isPause = true;
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
                    this.finishGame();
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
     * @param {string} startDate - The start date of the game.
     * @returns {Object} The data object containing the game information.
     * @description Creates a data object with the game information to send to the server.
     */

    getData(id, username, startDate){
        const data = {
            user: id,
            user_a: username,
            user_b: 'Pepe',
            num_goals_scored: this.paddle1.score,
            num_goals_agsainst: this.paddle2.score,
            num_goals_stopped_a: this.paddle1.goals_stopped,
            num_goals_stopped_b: this.paddle2.goals_stopped,
            start_date: startDate,
            time_played: INITIAL_REMAINING_TIME - this.remainingTime
        };
        return data;
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
        this.pause(this._getDOM().querySelector('.pause'));
        let startDate = new Date();
        startDate = startDate.toISOString().slice(0, 19);
        if(localStorage.getItem('access_token')){
            UserService.getMyInfo().then(({id, username}) => {
                const data = this.getData(id, username, startDate);
                GameService.saveMatch(data).catch(() => {
                    SnackbarService.addToast({
                        title: this.translator.translate('SNACKBAR.LOCAL_MATCH.ERROR_SENDING_DATA.TITLE'),
                        body: this.translator.translate('SNACKBAR.LOCAL_MATCH.ERROR_SENDING_DATA.DESC')
                    });
                });
            });
        }
    }

    /**
     * @param {number} deltaTime - The time difference between frames to smooth the movement.
     * @description Handles the core game logic, including updating the score, moving paddles, and checking for collisions.
     */

    gameMovement(deltaTime) {
        this.upScore();
        this.move(this.paddle1, KEY_W, KEY_S, deltaTime);
        this.move(this.paddle2, KEY_O, KEY_L, deltaTime);
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
            this.pauseBg = this._getDOM().querySelector('.background-pause');
            this.score = this._getDOM().querySelectorAll('.score');
            this.timerInterval = null;
            this.isPause = false;
            this.remainingTime = INITIAL_REMAINING_TIME;
            this.lastTime = 0;
            this.initGame();
            this.startTimer();
            requestAnimationFrame((time) => this.gameLoop(time));
        }
    }

    bind(){
        const btnPlay = this._getDOM().querySelector('.play');
        const btnPause = this._getDOM().querySelector('.pause');
        this.subscribe(btnPlay, 'click', () => this.play(btnPause));
        this.subscribe(btnPause, 'click', () => this.pause(btnPause));
        this.subscribe(window, 'keydown', e => {
            this.keysPressed.set(e.keyCode, true);
        });
        this.subscribe(window, 'keyup', e => {
            this.keysPressed.set(e.keyCode, false);
        });
        this.subscribe(window, 'resize', () => this.updateElements());
    }

    render() {
        return `
            <div class="container">
                <div class="position-relative">
                    <div class="background-pause hidden">
                        <button class="btn-game play" ><i class="bi bi-play-fill"></i></button>
                    </div>
                    <div class="d-flex justify-content-between align-items-center p-0 info-board">
                        <div class="player-icon d-flex justify-content-center align-items-center gap-4 mx-lg-5 mx-3">
                            <img src="/src/resources/devs/cmorales.jpg" alt="Player 1">
                            <span class="text-white text-uppercase mt-3">Player 1</span>
                        </div>
                        <div class="info-mid">
                            <span class="text-white text-uppercase" id="timer-marker">05:00</span>
                        </div>
                        <div class="player-icon d-flex justify-content-center align-items-center gap-4 mx-lg-5 mx-3">
                            <span class="text-white text-uppercase mt-3">Player 2</span>
                            <img src="/src/resources/devs/atrujill.jpg" alt="Player 2">
                        </div>
                    </div>
                    <div class="d-flex flex-r d-flex score-board">
                        <span class="score" id="score-1">0</span>
                        <button class="btn-game pause"><i class="bi bi-pause"></i></button>
                        <span class="score" id="score-2">0</span>
                    </div>
                    <canvas class="pongCanvas" width="1920" height="1080"></canvas>
                </div>
            </div>
        `;
    }
});