import WebComponent, { Component } from '#WebComponent';

import { DEFAULT_DIMENSION_VALUE } from '/src/const/index.js';

import css from './input-field.css?inline';

export default Component ({
    tagName: 'input-field',
    styleCSS: css
},

class InputField extends WebComponent {

    renderTextInput(id, width, height, inputType, placeholder, ariaLabel) {
        return `
            <input
                id="${id}"
                type="${inputType}"
                placeholder="${placeholder}"
                class="w-100 text-input text-white rounded mx-auto my-0 p-3"
                style="width:${width}; height:${height}; background-color: var(--app-secondary-bg-color);"
                aria-label="${ariaLabel}"
            >
            </input>
        `;
    }

    renderFileInput(id, width, height, name, ariaLabel) {
        return `
            <div class="file-select">
                <input
                    id= "${id}"
                    type="file"
                    class="rounded mx-auto p-3"
                    style="width:${width}; height:${height};"
                    name="${name}"
                    aria-label="${ariaLabel}"
                >
                </input>
            </div>
        `;
    }

    render() {
        const width = this.getAttribute('w') || DEFAULT_DIMENSION_VALUE;
        const height = this.getAttribute('h') || DEFAULT_DIMENSION_VALUE;
        const id = this.getAttribute('id') || null;
        const inputTitle = this.getAttribute('title') || 'DEFAULT TITLE';
        const inputType = this.getAttribute('type') || 'text';
        const placeholder = this.getAttribute('placeholder') || null;
        const name = this.getAttribute('name') || null;
        const ariaLabel = this.getAttribute('aria-label') || null;

        return `
            <div class="mt-5 mb-3">
                <sub-header-text color="var(--app-secondary-color)">
                    ${inputTitle}
                </sub-header-text>
            </div>
            ${ inputType === 'file' ? this.renderFileInput(id, width, height, name, ariaLabel) : this.renderTextInput(id, width, height, inputType, placeholder, ariaLabel) }
        `;
    }
});