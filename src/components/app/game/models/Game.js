import Ball, { BallDirection } from './Ball';
import { KEY_ARROW_DOWN, KEY_ARROW_UP, KEY_S, KEY_W } from '../AppGame';
import { Sounds, drawFieldLine, gradeToRadians } from '../PongUtils';
import { CanvasObject } from './CanvasRenderizable';
import Paddle from './Paddle';

export const PaddleTypes = {
    LEFT: 'left',
    RIGHT: 'right',
};

const MAX_GOALS = 7;

export class Game extends CanvasObject {
    /**
     * @type {Ball} The ball instance.
     */
    #ball = null;

    /**
     * @type {{left: Paddle, right: Paddle}} The paddles instances
     */
    #paddles = {left: null, right: null};
    #isGoldenGoal = false;
    #startDate = null;

    /**
     * Constructs a new Game instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the game on.
     */
    constructor(canvas) {
        super(canvas);
        this.#ball = new Ball(this.getCanvas());
        this.resetPaddles();
        this.#startDate = new Date();
    }

    /*************************************************
     *              Getters and setters              *
     *************************************************/

    getWinner() {
        return this.#paddles.left.getScore() > this.#paddles.right.getScore() ? PaddleTypes.LEFT : PaddleTypes.RIGHT;
    }

    isTie() {
        return this.#paddles.left.getScore() === this.#paddles.right.getScore();
    }

    hasFinished() {
        return this.#paddles.left.getScore() >= MAX_GOALS || this.#paddles.right.getScore() >= MAX_GOALS || this.#isGoldenGoal;
    }

    getPaddles() { return this.#paddles; }

    getStartDate() { return this.#startDate; }

    setGoldenGoal() {
        this.#ball.setColor('#FFD700');
        this.#isGoldenGoal = true;
        Sounds.makeGoldenGoalSound();
        Sounds.makeBackgroundMusicQuicker();
    }

    /*************************************************
     *                 Public methods                *
     *************************************************/

    resetPaddles() {
        this.#setPaddle(PaddleTypes.LEFT);
        this.#setPaddle(PaddleTypes.RIGHT);
    }

    render() {
        const context = this.getContext();
        const canvas = this.getCanvas();
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawFieldLine(context, canvas.width, canvas.height);
        this.#ball.render();
        this.#paddles.left.render();
        this.#paddles.right.render();
    }

    checkScore() {
        let scoringPaddle = null, direction = null;

        if (this.#ball.x >= this.getCanvas().width) {
            scoringPaddle = this.#paddles.right;
            direction = BallDirection.RIGHT;
        } else if (this.#ball.x <= 0) {
            scoringPaddle = this.#paddles.left;
            direction = BallDirection.LEFT;
        }
        if (scoringPaddle) {
            scoringPaddle.increaseScore();
            this.#ball.respawnBall(direction);
            this.#paddles.left.reset();
            this.#paddles.right.reset();
            return {
                position: direction === BallDirection.RIGHT ? PaddleTypes.RIGHT : PaddleTypes.LEFT,
                paddle: scoringPaddle,
            };
        }
        return null;
    }

    finishGame() {
        Sounds.stopBackgroundMusic();
        Sounds.makeGameEndSound();
        return this.getWinner();
    }


    move(deltaTime, keyPressed) {
        this.#movePaddle(PaddleTypes.LEFT, deltaTime, keyPressed);
        this.#movePaddle(PaddleTypes.RIGHT, deltaTime, keyPressed);
        this.#ball.move(deltaTime);
        this.#checkPaddleCollision();
    }

    /*************************************************
     *                Private methods                *
     *************************************************/

    /**
     * @param {Paddle} paddleType - The paddle to move (either paddle1 or paddle2).
     * @param {number} deltaTime - The time difference between frames to smooth the movement.
     * @description Moves the paddle up or down based on the keys pressed and smooths the movement based on deltaTime.
     */
    #movePaddle(paddleType, deltaTime, keyPressed) {
        const paddle = this.#paddles[paddleType];
        if (keyPressed.get(paddle.getUpKey())) {
            paddle.move(-1, deltaTime);
        } else if (keyPressed.get(paddle.getDownKey())) {
            paddle.move(1, deltaTime);
        }
    }

    #setPaddle(paddleType) {
        let paddleConfig;
        if (paddleType === PaddleTypes.LEFT) {
            paddleConfig = this.#getLeftPaddleConfig(Paddle.getGenericPaddleConfig(this.getCanvas()));
        } else {
            paddleConfig = this.#getRightPaddleConfig(Paddle.getGenericPaddleConfig(this.getCanvas()));
        }
        if (!this.#paddles[paddleType]) {
            this.#paddles[paddleType] = new Paddle(
                this.getCanvas(),
                paddleConfig.x,
                paddleConfig.y,
                paddleConfig.width,
                paddleConfig.height,
                paddleConfig.color,
                paddleConfig.upKey,
                paddleConfig.downKey,
            );
        } else {
            const paddle = this.#paddles[paddleType];
            paddle.setWidth(paddleConfig.width);
            paddle.setHeight(paddleConfig.height);
            paddle.setX(paddleConfig.x);
            paddle.setY(paddleConfig.y);
        }
    }

    /**
     * @param {Object} ball - Instance of the Ball class representing the ball.
     * @param {Object} paddle - Instance of the Paddle class representing the paddle.
     * @description Checks for a collision between the ball and the paddle. If a collision occurs adjust the ball's direction.
     */
    #checkPaddleCollision() {
        const radius = this.#ball.getRadius();
        if (this.#ball.x - radius < this.#paddles.left.position.x + this.#paddles.left.getWidth() &&
            this.#ball.x - radius > this.#paddles.left.position.x &&
            this.#ball.y + radius > this.#paddles.left.position.y &&
            this.#ball.y - radius < this.#paddles.left.position.y + this.#paddles.left.getHeight() &&
            this.#ball.getVelocity().x < 0) {
            this.#paddles.left.goals_stopped++;
            Sounds.makeGoSound();
            this.#paddleBouncedBall(PaddleTypes.LEFT);
        }

        if (this.#ball.x + radius > this.#paddles.right.position.x
            && this.#ball.x + radius < this.#paddles.right.position.x + this.#paddles.right.getWidth()
            && this.#ball.y + radius > this.#paddles.right.position.y
            && this.#ball.y - radius < this.#paddles.right.position.y + this.#paddles.right.getHeight()
            && this.#ball.getVelocity().x > 0) {
            this.#paddles.right.increaseGoalsStopped();
            Sounds.makeGoSound();
            this.#paddleBouncedBall(PaddleTypes.RIGHT);
        }
    }

    /**
     * @param {Object} paddleType - Paddle class representing the paddle.
     * @description Calculates and updates the ball's velocity when it bounces off the paddle, adjusting direction and angle based on the point of impact.
     */
    #paddleBouncedBall(paddleType) {
        const paddle = this.#paddles[paddleType];
        const sign = paddleType === PaddleTypes.LEFT ? 1 : -1;
        // Normalize the distance from the center of the paddle to the point of impact.
        const dy = (this.#ball.y - paddle.getCenterPaddle().y) / (paddle.getHeight() / 2);
        const angle = gradeToRadians(this.#ball.getMaxAngle() * dy);
        this.#ball.setVelocity({
            x: sign * Math.abs(this.#ball.getSpeed() * Math.cos(angle)),
            y: this.#ball.getSpeed() * Math.sin(angle),
        });
        this.#ball.increaseSpeed();
    }

    #getLeftPaddleConfig({ width, height, x, y }) {
        return {
            x, y, width, height,
            color: '#8D8DDA',
            upKey: KEY_W,
            downKey: KEY_S,
        };
    }

    #getRightPaddleConfig({ width, height, x, y} ) {
        return {
            x: this.getCanvas().width - width - x,
            y, width, height,
            color: '#ABD9D9',
            upKey: KEY_ARROW_UP,
            downKey: KEY_ARROW_DOWN,
        };
    }
}