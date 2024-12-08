/**
 * @param {number} angle - Angle in degrees.
 * @returns {number} Angle in radians.
 * @description Converts an angle from degrees to radians.
 */

export function gradeToRadians(angle) {
    return angle * (Math.PI / 180);
}

/**
 * @param {CanvasRenderingContext2D} ctx - Canvas context where the line is drawn.
 * @param {number} width - Width of the canvas.
 * @param {number} height - Height of the canvas.
 * @description Draws a line at the center of the game field.
 */
export function drawFieldLine(ctx, width, height) {
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 10;
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    ctx.globalAlpha = 1.0;
}

/**
 * @param {number} remainingTime - Remaining time in seconds.
 * @returns {string} Formatted time as a string in MM:SS format.
 * @description Formats the remaining time in minutes and seconds for display in the game.
 */

export function timerDisplay(remainingTime) {
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    const formattedTime = `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
    return formattedTime;
}

/**
 * Calculates the speed of game objects based on the canvas width, adjusting for consistent gameplay across different resolutions.
 * @param {number} canvasWidth - Width of the game canvas.
 * @param {number} pongObjectVelocity - Base velocity of the game object.
 * @returns {number} Adjusted speed of the object based on canvas width.
 * @description Calculates the speed of game objects based on the canvas width, adjusting for consistent gameplay across different resolutions.
 */

export function calculateSpeed(canvasWidth, pongObjectVelocity) {
    const referenceWidth = 20;
    return (canvasWidth / referenceWidth) * pongObjectVelocity;
}

export class Sounds {
    static GO_SOUND = [
        new Audio('/sounds/go0.mp3'),
        new Audio('/sounds/go1.mp3'),
        new Audio('/sounds/go2.mp3'),
        new Audio('/sounds/go3.mp3'),
    ];

    static GAME_BACKGROUND = (() => {
        const gameBackground = new Audio('/sounds/game-background.mp3');
        gameBackground.volume = 0.5;
        gameBackground.loop = true;
        return gameBackground;
    })();

    static GAME_END = new Audio('/sounds/game-end.mp3');

    static GOLDEN_GOAL = new Audio('/sounds/game-golden-goal.mp3');

    static currentGo = 0;

    static makeGoSound() {
        const audio = Sounds.GO_SOUND[Sounds.currentGo];
        Sounds.currentGo = (Sounds.currentGo + 1) % 4;
        audio.play();
    }

    static startBackgroundMusic() {
        Sounds.GAME_BACKGROUND.play();
    }

    static stopBackgroundMusic() {
        Sounds.GAME_BACKGROUND.pause();
    }

    static makeBackgroundMusicQuicker() {
        Sounds.GAME_BACKGROUND.playbackRate = 1.2;
    }

    static makeGoldenGoalSound() {
        Sounds.GOLDEN_GOAL.play();
    }

    static makeGameEndSound() {
        Sounds.GAME_END.play();
    }
}
