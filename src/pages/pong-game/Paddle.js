export default class Paddle {
    constructor(x, y, width, height,canvasWidth, color ) {
        const absoluteMinSpeed = 5;
        this.x = x;
        this.y = y;
        this.init_pos = {x: this.x, y: this.y};
        this.width = width;
        this.height = height;
        this.color = color || '#8D8DDA';
        this.border_radius = 8;
        this.velocity = { x: 0, y: Math.max(canvasWidth * 0.003, absoluteMinSpeed) };
        this.score = 0;
    }

    set(width, height, x, y) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    getHalfWidth() {
        return this.width / 2;
    }

    getHalfHeight() {
        return this.height / 2;
    }

    getCenterPaddle() {
        return {x: this.x + this.getHalfWidth(), y: this.y + this.getHalfHeight()};
    }

    move(direction, wall_height) {
        this.y += direction * this.velocity.y;
        if (this.y < 0) {
            this.y = 0;
        } else if (this.y + this.height > wall_height) {
            this.y = wall_height - this.height;
        }
    }

    reset() {
        this.x = this.init_pos.x;
        this.y = this.init_pos.y;
    }

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
