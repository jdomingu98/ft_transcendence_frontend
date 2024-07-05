import WebComponent, { Component } from '#WebComponent';

import css from './Home.css?inline';

export default Component ({
    tagName: 'home',
    styleCSS: css
},

class HomePage extends WebComponent {
    render() {
        return `
            <div>
                <div class="si bg-warning">Homepage works!</div>
            </div>
        `;
    }
});
