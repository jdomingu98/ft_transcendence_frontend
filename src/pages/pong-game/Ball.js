export default class Ball {
    constructor(x, y, radius, canvasWidth) {
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.maxAngle = 60;
        this.color = '#8DBEDA';
        this.canvasWidth = canvasWidth;
        this.velocity = { x: this.canvasWidth * 0.003, y: 0};
        this.initialSpeed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        this.speed = this.initialSpeed;
        this.speedMultiplier = 1.01;
        this.maxSpeed = this.initialSpeed * 2.4;
    }

    move(wall_height) {
        const bottom = this.y + this.radius;
        const top = this.y - this.radius;

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if((bottom > wall_height && this.velocity.y > 0) || (top < 0 && this.velocity.y < 0))
            this.velocity.y *= -1;
    };

    respawnBall(width, height, direction) {
        this.x = width / 2;
        this.y = height / 2;
        this.speed = this.initialSpeed;
        this.velocity = { x: this.canvasWidth * 0.004 * direction, y: 0};
    }

    increaseSpeed() {
        const boost = 0.3;
        this.speed = Math.min(this.speed * this.speedMultiplier + boost, this.maxSpeed);
    }

    render(ctx, width) {
        const scaleX = width < 410 ? 1.9 : (width < 600 ? 1.3 : 1);
        const scaleY = 1;

        ctx.save();
        ctx.scale(scaleX, scaleY);

        ctx.shadowColor = 'rgba(0, 0, 0, 0.303)';
        ctx.shadowBlur = 6;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x / scaleX, this.y / scaleY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'rgba(255, 255, 255, 0.2)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 2;
        ctx.shadowOffsetY = 1;
        ctx.beginPath();
        ctx.arc(this.x / scaleX, this.y / scaleY, this.radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.restore();
    }
}