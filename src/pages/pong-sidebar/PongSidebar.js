import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';

export default Component({
    tagName: 'pong-sidebar'
},
class PongSidebar extends WebComponent {
    render() {
        return `
            <section style="height: calc(100vh - 40px);">
                <app-game></app-game>
            </section>
        `;
    }
});