import { CanvasObject } from './CanvasRenderizable';
import { calculateSpeed } from '../PongUtils';

const MIN_PADDLE_WIDTH = 35;
const MAX_PADDLE_WIDTH = 45;
const MIN_PADDLE_HEIGHT = 240;
const MAX_PADDLE_HEIGHT = 285;

const DEFAULT_RADIUS = 8;


export default class Paddle extends CanvasObject {
    position;

    #color;
    #initialPosition;
    #height;
    #width;
    #velocity;
    #score = 0;
    #goalsStopped = 0;
    #upKey;
    #downKey;

    constructor(canvas, x, y, width, height, color, upKey, downKey) {
        super(canvas);

        this.#initialPosition = { x, y };
        this.position = { ...this.#initialPosition };

        this.setHeight(height);
        this.setWidth(width);
        this.#color = color;

        this.#velocity = { x: 0, y: this.#getInitialSpeed() };
        this.#upKey = upKey;
        this.#downKey = downKey;
    }

    /*************************************************
     *              Getters and setters              *
     *************************************************/

    getHeight() { return this.#height; }
    setHeight(height) { this.#height = height; }

    getWidth() { return this.#width; }
    setWidth(width) { this.#width = width;}

    setX(x) { this.position.x = x; }
    setY(y) { this.position.y = y; }

    getScore() { return this.#score; }
    getGoalsStopped() { return this.#goalsStopped; }

    getUpKey() { return this.#upKey; }
    getDownKey() { return this.#downKey; }

    /**
     * Returns the center coordinates of the paddle.
     * @returns {{x: number, y: number}} Center X and Y coordinates of the paddle.
     */
    getCenterPaddle() {
        return { x: this.position.x + this.#width / 2, y: this.position.y + this.#height / 2 };
    }

    /*************************************************
     *                 Public methods                *
     *************************************************/


    render() {
        const context = this.getContext();
        context.fillStyle = this.#color;
        context.beginPath();
        context.roundRect(this.position.x, this.position.y, this.#width, this.#height, DEFAULT_RADIUS);
        context.fill();
        context.strokeStyle = 'black';
        context.lineWidth = 2;
        context.stroke();
    }

    /**
     * Moves the paddle based on direction and speed, ensuring it stays within canvas bounds.
     * @param {number} direction - Direction of movement (positive for down, negative for up).
     * @param {number} deltaTime - Time difference to adjust movement for smooth animation.
     */
    move(direction, deltaTime) {
        const newPosition = this.position.y + direction * this.#velocity.y * deltaTime;
        this.position.y = Math.max(0, Math.min(newPosition, this.getCanvas().height - this.#height));
    }

    reset() {
        this.position = { ...this.#initialPosition };
    }

    increaseScore() { this.#score++; }
    increaseGoalsStopped() { this.#goalsStopped++; }

    static getGenericPaddleConfig(canvas) {
        const paddleWidth = Math.max(MIN_PADDLE_WIDTH, Math.min(canvas.clientWidth * 0.016, MAX_PADDLE_WIDTH));
        const paddleHeight = Math.max(MIN_PADDLE_HEIGHT, Math.min(canvas.clientHeight * 0.5, MAX_PADDLE_HEIGHT));
        const paddleInitialPosX = canvas.clientWidth * 0.05;
        const paddleInitialPosY = (canvas.height - paddleHeight) / 2;
        return {
            width: paddleWidth,
            height: paddleHeight,
            x: paddleInitialPosX,
            y: paddleInitialPosY,
        };
    }

    /*************************************************
     *                Private methods                *
     *************************************************/

    #getInitialSpeed() {
        return calculateSpeed(this.getCanvas().width, 6);
    }
}
