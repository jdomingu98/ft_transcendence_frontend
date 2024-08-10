import { DEFAULT_IMG_DIMENSION, DEFAULT_PROFILE_IMG } from '/src/const/index.js';
import WebComponent, { Component } from '#WebComponent';
import css from './profile-img.css?inline';


export default Component ({
    tagName: 'profile-img',
    styleCSS: css
},

class ProfileImg extends WebComponent {
    render() {
        const src = this.getAttribute('src') || DEFAULT_PROFILE_IMG;
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