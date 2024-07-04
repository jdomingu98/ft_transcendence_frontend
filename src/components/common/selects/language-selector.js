import { Component, WebComponent } from '#WebComponent';

import css from './language-selector.css?inline';

import { DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';

export default Component ({
    tagName: 'language-selector',
    styleCSS: css
},

class LanguageSelector extends WebComponent {
    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;

        return `
            <select
                id="language"
                class="form-select bg-transparent text-white border rounded-sm mx-auto"
                style="width:${width}; height:${height};"
                aria-label="Web language selector"
            >
                <option default value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="fr">🇫🇷 French</option>
            </select>
        `;
    }
});