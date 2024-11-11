import { calculateSpeed } from './PongUtils';

export default class Paddle {
    /**
     * @param {number} x - X coordinate of the paddle on the canvas (leftmost side).
     * @param {number} y - Y coordinate of the paddle on the canvas (topmost side).
     * @param {number} width - Width of the paddle.
     * @param {number} height - Height of the paddle.
     * @param {number} gameAreaWidth - Width of the game area, used for speed calculation.
     * @param {string} color - Color of the paddle in hexadecimal format. Default is #8D8DDA.
     * @description Initializes the paddle with specified properties.
     */

    constructor(x, y, width, height, gameAreaWidth, color) {
        this.x = x;
        this.y = y;
        this.init_pos = { x: this.x, y: this.y };
        this.width = width;
        this.height = height;
        this.color = color || '#8D8DDA';
        this.border_radius = 8;
        // Const used to calculate initial velocity.
        this.elementVelocity = 6;
        this.velocity = { x: 0, y: calculateSpeed(gameAreaWidth, this.elementVelocity) };
        this.goals_stopped = 0;
        this.score = 0;
    }

    /**
     * @param {number} width - New width of the paddle.
     * @param {number} height - New height of the paddle.
     * @param {number} x - New X coordinate of the paddle.
     * @param {number} y - New Y coordinate of the paddle.
     * @description Updates the paddle's size and position.
     */

    set(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    /**
     * @returns {{x: number, y: number}} Center X and Y coordinates of the paddle.
     * @description Returns the center coordinates of the paddle.
     */

    getCenterPaddle() {
        return { x: this.x + this.width / 2, y: this.y + this.height / 2 };
    }

    /**
     * @param {number} direction - Direction of movement (positive for down, negative for up).
     * @param {number} wall_height - Height of the game area for boundary checking.
     * @param {number} deltaTime - Time difference to adjust movement for smooth animation.
     * @description Moves the paddle based on direction and speed, ensuring it stays within canvas bounds.
     */

    move(direction, wall_height, deltaTime) {
        this.y += direction * this.velocity.y * deltaTime;
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > wall_height) {
            this.y = wall_height - this.height;
        }
    }

    /**
     * @description Resets the paddle's position to its initial coordinates.
     */

    reset() {
        this.x = this.init_pos.x;
        this.y = this.init_pos.y;
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context where the paddle is drawn.
     * @description Renders the paddle on the canvas with the specified color and border.
     */

    render(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, this.border_radius);
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
    }
}
