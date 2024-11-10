import WebComponent, { Component } from '#WebComponent';

export default Component({
    tagName: 'pong-page',
},
class PongPage extends WebComponent {
    render() {
        return `
           <app-game></app-game>
        `;
    }
});