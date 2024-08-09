import { Component, WebComponent } from '#WebComponent';
import { DEFAULT_IMG_DIMENSION, DEFAULT_PROFILE_IMG_PATH } from '/src/const/index.js';
import css from './form-field.css?inline';


export default Component ({
    tagName: 'form-field',
    styleCSS: css
},

class FormField extends WebComponent {
    render() {
        const text = this.getAttribute('text') || 'text';
        const type = this.getAttribute('type') || 'type';
        const placeholder = this.getAttribute('placeholder') || 'Enter your email or username';

        return `
            <form class="form-group mb-3 mt-2 d-flex flex-column">
                <label for="input" class="text-uppercase mb-3 mt-3 text-start ">${text}</label>
                <input type="${type}" id="input" name="input" placeholder="${placeholder}" class="mb-3">
            </form>
        `;
    }
});