import { Sounds, calculateSpeed } from './PongUtils';

const DEFAULT_COLOR = '#8DBEDA';
const DEFAULT_RADIUS = 20;
const SPEED_MULTIPLIER = 1.05;
const SPEED_BOOST = 0.3;

export default class Ball {
    x;
    y;

    #canvas = null;
    #color = DEFAULT_COLOR;
    #radius = DEFAULT_RADIUS;
    #initialSpeed;
    #speed;
    #velocity;
    #MAX_SPEED;

    /**
     * Constructs a new Ball instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the ball on.
     */
    constructor(canvas) {
        this.#canvas = canvas;

        this.x = this.#canvas.width / 2;
        this.y = this.#canvas.height / 2;
        this.#initialSpeed = this.#getInitialSpeed();
        this.#speed = this.#initialSpeed;
        this.#velocity = { x: this.#initialSpeed, y: 0 };
        this.#MAX_SPEED = this.#initialSpeed * 2;
    }

    /*************************************************
     *              Getters and setters              *
     *************************************************/

    /**
     * Calculates the maximum angle the ball can have based on the canvas width.
     * @returns {number} The maximum angle the ball can have based on the canvas width.
     */
    getMaxAngle() {
        return this.#canvas.clientWidth > 650 ? 50 : 20;
    }

    setColor(color) {
        this.#color = color;
    }

    getRadius() {
        return this.#radius;
    }

    getSpeed() {
        return this.#speed;
    }

    getVelocity() {
        return this.#velocity;
    }

    setVelocity(velocity) {
        this.#velocity = velocity;
    }

    /*************************************************
     *                 Public methods                *
     *************************************************/

    render() {
        const ctx = this.#getContext();
        const width = this.#canvas.clientWidth;

        const scaleX = width < 410 ? 1.9 : (width < 600 ? 1.3 : 1);
        const scaleY = 1;

        ctx.save();
        ctx.scale(scaleX, scaleY);

        // First shadow.
        this.#setShadow('rgba(0, 0, 0, 0.303)', 6, 2, 1);
        this.#drawBall(this.x / scaleX, this.y / scaleY);

        // Second shadow.
        this.#setShadow('rgba(255, 255, 255, 0.2)', 8, 2, 1);
        this.#drawBall(this.x / scaleX, this.y / scaleY);

        // Reset shadow.
        this.#setShadow('transparent', 0, 0, 0);
        ctx.restore();
    }

    move(deltaTime) {
        this.x += this.#velocity.x * deltaTime;
        this.y += this.#velocity.y * deltaTime;

        if (this.#hasCollidedWithWall()) {
            this.#velocity.y *= -1;
            Sounds.makeGoSound();
        }
    }

    increaseSpeed() {
        this.#speed = Math.min(this.#speed * SPEED_MULTIPLIER + SPEED_BOOST, this.#MAX_SPEED);
    }

    respawnBall(direction) {
        this.x = this.#canvas.width / 2;
        this.y = this.#canvas.height / 2;
        this.#speed = this.#initialSpeed;
        this.#velocity = {
            x: this.#getInitialSpeed() * direction,
            y: 0,
        };
    }

    /*************************************************
     *                Private methods                *
     *************************************************/

    /**
     * Getter for the ball's context.
     * @returns {CanvasRenderingContext2D} The 2D rendering context of the canvas.
     */
    #getContext() {
        return this.#canvas.getContext('2d');
    }

    /**
     * Sets the shadow properties for the ball.
     * @param {string} color - The color of the shadow.
     * @param {number} blur - The blur radius of the shadow.
     * @param {number} offsetX - The horizontal offset of the shadow.
     * @param {number} offsetY - The vertical offset of the shadow.
     */
    #setShadow(color, blur, offsetX, offsetY) {
        const context = this.#getContext();
        context.shadowColor = color;
        context.shadowBlur = blur;
        context.shadowOffsetX = offsetX;
        context.shadowOffsetY = offsetY;
    }

    /**
     * Draws the ball on the canvas.
     * @param {number} x - The x-coordinate of the ball.
     * @param {number} y - The y-coordinate of the ball.
     */
    #drawBall(x, y) {
        const context = this.#getContext();
        context.fillStyle = this.#color;
        context.beginPath();
        context.arc(x, y, this.#radius, 0, Math.PI * 2);
        context.fill();
    }

    #hasCollidedWithWall() {
        const borderTop = this.y - this.#radius;
        const borderBottom = this.y + this.#radius;
        return (borderTop <= 0 && this.#velocity.y < 0) || (borderBottom >= this.#canvas.height && this.#velocity.y > 0);
    }

    #getInitialSpeed() {
        return calculateSpeed(this.#canvas.width, 8);
    }
}