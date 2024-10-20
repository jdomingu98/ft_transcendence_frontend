import { DEFAULT_DIMENSION_VALUE, LANGUAGES } from '#const';

import WebComponent, { Component } from '#WebComponent';

export default Component ({
    tagName: 'language-selector',
    styleCSS: `
        #language {
            border: 1px solid var(--app-secondary-color) !important;
            font-size: 0,85rem;
            font-family: var(--app-secondary-text-font);
            cursor: pointer;
        }
        
        select.form-select option {
            background-color: var(--app-secondary-bg-color);
        }
    `,
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
        const unsubscribe = this.translator.observable$.subscribe(language => {
            this._getDOM().querySelector('#language').value = language;
        });
        return () => {
            unsubscribe();
        };
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