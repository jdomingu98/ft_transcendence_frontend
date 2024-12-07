import { CanvasObject } from '../models/CanvasRenderizable';

export default class Confetti extends CanvasObject {
    #isRunning = false;

    #colors = ['#FFC107', '#FF5722', '#8BC34A', '#03A9F4', '#E91E63', '#9C27B0'];

    #particles = [];

    constructor(canvas) {
        super(canvas);
        this.#resizeCanvas();
        window.addEventListener('resize', this.#resizeCanvas);
    }

    stop() {
        this.#isRunning = false;
    }

    cleanListeners() {
        window.removeEventListener('resize', this.#resizeCanvas);
    }

    #createParticles() {
        if (!this.#isRunning || this.#particles.length > 700) return;
        const canvas = this.getCanvas();

        for (let i = 0; i < 3; i++) {
            this.#particles.push({
                x: Math.random() * canvas.width,
                y: -10,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                color: this.#colors[Math.floor(Math.random() * this.#colors.length)],
                velocityX: (Math.random() - 0.5) * 2,
                velocityY: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
    }

    #updateParticles() {
        const ctx = this.getContext();
        const canvas = this.getCanvas();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.#particles.forEach( (particle, index) => {
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.rotation += particle.rotationSpeed;
            if (particle.y > canvas.height)
                this.#particles.splice(index, 1);

            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.fillStyle = particle.color;
            ctx.fillRect(0, 0, particle.width, particle.height);
            ctx.restore();
        });
    }

    runConfetti() {
        if (this.#isRunning) return;
        this.#isRunning = true;
        const animate = () => {
            this.#createParticles();
            this.#updateParticles();

            // Stop animation when there is no particles or modal is closed
            if (this.#particles.length > 0) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    #resizeCanvas = () => {
        const canvas = this.getCanvas();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
}