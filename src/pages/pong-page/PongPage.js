import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';

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