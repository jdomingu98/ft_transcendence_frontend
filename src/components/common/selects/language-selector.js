import { Component, WebComponent } from '#WebComponent';

import css from './language-selector.css?inline';

import { BUTTON_DEFAULT_MSG, BUTTON_DEFAULT_PRIMARY_COLOR } from '/src/const/index.js';

export default Component ({
    tagName: "language-selector",
    styleCSS: css
},

class LanguageSelector extends WebComponent {
    render() {
        const width = this.getAttribute("w") || "auto";
        const height = this.getAttribute("h") || "auto";

        return `
            <select
                id="language"
                class="form-select"
                style="width:${width}; height:${height};"
                aria-label="Web language selector"
            >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="fr">🇫🇷 French</option>
            </select>
        `;
    }
});