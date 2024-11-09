import { calculateSpeed } from './PongUtils';

export default class Ball {
    /**
     * Constructs a new Ball instance.
     * @param {number} x - X coordinate of the ball on the canvas.
     * @param {number} y - Y coordinate of the ball on the canvas.
     * @param {number} radius - Radius of the ball, determining its size on the canvas.
     * @param {number} gameAreaWidth - Width of the game area, used to calculate the initial speed.
     * @param {number} canvasWidth - Width of the canvas to set the max angle.
     */

    constructor(x, y, radius, gameAreaWidth, canvasWidth) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.maxAngle = canvasWidth > 650 ? 50 : 25;
        this.color = '#8DBEDA';
        this.gameAreaWidth = gameAreaWidth;
        // Const used to calculate initial velocity.
        this.elementVelocity = 8.4;
        this.velocity = { x: calculateSpeed(this.gameAreaWidth, this.elementVelocity), y: 0 };
        this.initialSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        this.speed = this.initialSpeed;
        this.speedMultiplier = 1.05;
        this.maxSpeed = this.initialSpeed * 2;
    }

    /**
     * @param {number} angle - Angle in degrees applied to the ball's movement.
     * @description Sets the angle of the ball's movement.
     */

    set_angle(angle) {
        this.angle = angle;
    }

    /**
     * @param {number} wall_height - Height of the canvas to check for collisions.
     * @param {number} deltaTime - Time passed since the last frame, used to smooth movement.
     * @description Updates the ball's position based on its velocity.
     */

    move(wall_height, deltaTime) {
        const bottom = this.y + this.radius;
        const top = this.y - this.radius;

        // Update position based on velocity and delta time.
        this.x += this.velocity.x * deltaTime;
        this.y += this.velocity.y * deltaTime;

        // Reverse Y velocity if hitting top or bottom wall.
        if((bottom > wall_height && this.velocity.y > 0) || (top < 0 && this.velocity.y < 0))
            this.velocity.y *= -1;
    };

    /**
     * @param {number} width - Width of the canvas.
     * @param {number} height - Height of the canvas.
     * @param {number} direction - Direction the ball should move in (1 for right, -1 for left).
     * @description Respawns the ball at the center of the canvas and resets its speed.
     */

    respawnBall(width, height, direction) {
        this.x = width / 2;
        this.y = height / 2;
        this.speed = this.initialSpeed;
        this.velocity = { x: calculateSpeed(this.gameAreaWidth, this.elementVelocity) * direction, y: 0 };
    }

    /**
     * @description Increases the speed of the ball on paddle bounce, using the multiplier and a fixed boost, capped at maxSpeed.
     */

    increaseSpeed() {
        //Const used to increase speed faster.
        const boost = 0.3;
        this.speed = Math.min(this.speed * this.speedMultiplier + boost, this.maxSpeed);
    }

    /**
     * @param {CanvasRenderingContext2D} ctx - The canvas context where the ball is drawn.
     * @param {number} width - Width of the canvas to determine rendering scale.
     * @description Draws the ball on the canvas with shadow effects and scales for different resolutions.
     */

    render(ctx, width) {
        // Determine scaleX based on canvas width for optimal ball appearance.
        const scaleX = width < 410 ? 1.9 : (width < 600 ? 1.3 : 1);
        const scaleY = 1;

        ctx.save();
        ctx.scale(scaleX, scaleY);

        // Draw ball with shadow effect.
        ctx.shadowColor = 'rgba(0, 0, 0, 0.303)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x / scaleX, this.y / scaleY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Add lighter shadow effect on ball.
        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.beginPath();
        ctx.arc(this.x / scaleX, this.y / scaleY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Remove shadows and restore canvas context.
        ctx.shadowColor = 'transparent';
        ctx.restore();
    }
}
