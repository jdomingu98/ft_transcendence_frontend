
export default class Confetti {

    constructor(canvas) {
        this.colors = ['#FFC107', '#FF5722', '#8BC34A', '#03A9F4', '#E91E63', '#9C27B0'];
        this.particles = [];
        this.isModalOpen = true;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.animationFrame = null;
        this.#resizeCanvas();
        window.addEventListener('resize', () => this.#resizeCanvas());
    }

    #createParticles() {
        if (!this.isModalOpen || this.particles.length > 700) return;

        for (let i = 0; i < 3; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: -10,
                width: Math.random() * 10 + 5,
                height: Math.random() * 10 + 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                velocityX: (Math.random() - 0.5) * 2,
                velocityY: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
    }

    #updateParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.particles.forEach( (particle, index) => {
            particle.x += particle.velocityX;
            particle.y += particle.velocityY;
            particle.rotation += particle.rotationSpeed;
            if (particle.y > this.canvas.height)
                this.particles.splice(index, 1);

            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.rotation * Math.PI / 180);
            this.ctx.fillStyle = particle.color;
            this.ctx.fillRect(0, 0, particle.width, particle.height);
            this.ctx.restore();
        });
    }

    runConfetti() {
        if (this.animationFrame) return;

        const animate = () => {
            this.#createParticles();
            this.#updateParticles();

            // Stop animation when there is no particles or modal is closed
            if (this.particles.length === 0 && !this.isModalOpen) {
                this.animationFrame = null;
                return;
            }
            this.animationFrame = requestAnimationFrame(animate);
        };

        this.animationFrame = requestAnimationFrame(animate);
    }

    #resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setModalState(isOpen) {
        this.isModalOpen = isOpen;
    }
}