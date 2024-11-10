import '/src/components/app/game';
import WebComponent, { Component } from '#WebComponent';
import css from './PongSidebar.css?inline';

export default Component({
    tagName: 'pong-sidebar',
    styleCSS: css
},
class PongSidebar extends WebComponent {
    render() {
        return `
            <section class="pongtainer">
                <app-game></app-game>
            </section>
        `;
    }
});