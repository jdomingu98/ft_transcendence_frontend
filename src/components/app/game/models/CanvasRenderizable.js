export class CanvasObject {
    #canvas;
    #context;

    /**
     * Constructs a new CanvasObject instance.
     * @param {HTMLCanvasElement} canvas - The canvas element to render the ball on.
     */
    constructor(canvas) {
        this.#canvas = canvas;
        this.#context = canvas.getContext('2d');
    }

    render() {
        throw new Error('Method not implemented');
    }

    getContext() {
        return this.#context;
    }

    getCanvas() {
        return this.#canvas;
    }
}