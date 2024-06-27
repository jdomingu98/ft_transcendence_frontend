import { Component, WebComponent } from '#WebComponent';

import css from './profile-img.css?inline';

import { DEFAULT_PROFILE_IMG_PATH } from '/src/const/index.js';

export default Component ({
    tagName: "profile-img",
    styleCSS: css
},

class ProfileImg extends WebComponent {
    render() {
        const src = this.getAttribute("src") || DEFAULT_PROFILE_IMG_PATH;
        const width = this.getAttribute("w") || "100px";
        const height = this.getAttribute("h") || "100px";

        return `
            <div
                class="profile"
                style="width:${width}; height:${height}; background-image: url(${src})"
            >
            </div>
        `;
    }
});