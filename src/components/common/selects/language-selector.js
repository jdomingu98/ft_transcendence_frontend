import WebComponent, { Component } from '#WebComponent';
import { DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';
import { LANGUAGES } from '../../../const';
import css from './language-selector.css?inline';


export default Component ({
    tagName: 'language-selector',
    styleCSS: css
},

class LanguageSelector extends WebComponent {
    init() {
        this.state = {
            languages: LANGUAGES.map(language => ({
                ...language,
                name: `${language.flag} ${this.translator.translate(`LANGUAGE.${language.language.toUpperCase()}`)}`
            }))
        };
    }

    handleLanguageChange(event) {
        const language = event.target.value;
        this.translator.setLanguage(language);
    }

    bind() {
        this.subscribe('#language', 'change', event => this.handleLanguageChange(event));
    }

    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;

        return `
            <select
                id="language"
                class="form-select bg-transparent text-white border rounded-sm mx-auto"
                style="width:${width}; height:${height};"
                aria-label="Web language selector">

                ${this.state.languages.map(({ language, name, default: isDefault }) => `
                    <option ${isDefault ? 'default' : ''} value="${language}">${name}</option>
                `).join('')}
            </select>
        `;
    }
});