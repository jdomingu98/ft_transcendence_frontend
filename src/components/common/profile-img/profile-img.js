import { Component, WebComponent } from '#WebComponent';

import css from './profile-img.css?inline';

import { DEFAULT_PROFILE_IMG_PATH, DEFAULT_IMG_DIMENSION } from '/src/const/index.js';

export default Component ({
    tagName: 'profile-img',
    styleCSS: css
},

class ProfileImg extends WebComponent {
    render() {
        const src = this.getAttribute('src') || DEFAULT_PROFILE_IMG_PATH;
        const width = this.getAttribute('w') || DEFAULT_IMG_DIMENSION;
        const height = this.getAttribute('h') || DEFAULT_IMG_DIMENSION;

        return `
            <div
                class="mx-auto rounded-circle profile"
                style="width:${width}; height:${height}; background-image: url(${src})"
            >
            </div>
        `;
    }
});