import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';

document.querySelector('meta[name="description"]').content = 'Play the classic game of Pong. Move your paddle up and down to hit the ball and score points.';

export default Component({
    tagName: 'pong-page',
},
class PongPage extends WebComponent {
    render() {
        return `
            <landing-navbar></landing-navbar>
            <app-game></app-game>
            <landing-footer></landing-footer>
        `;
    }
});