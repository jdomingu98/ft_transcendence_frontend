/* eslint-disable indent */
import WebComponent, { Component} from '#WebComponent';
import css from './form-field.css?inline';


export default Component ({
    tagName: 'form-field',
    styleCSS: css
},

class FormField extends WebComponent {
    init() {
        this.state = {
            errors: this.getAttribute('error') || '',
        };
    }

    get value() {
        return this._getDOM().querySelector('input').value;
    }

    render() {
        this.state.errors = this.getAttribute('error') || '';
        const rl = this.getAttribute('rl') || 'input}';
        const text = this.getAttribute('text') || 'text';
        const type = this.getAttribute('type') || 'type';
        const placeholder = this.getAttribute('placeholder') || 'Enter your email or username';
        const isRequired = this.getAttribute('required') || '';
        const required = isRequired ? 'required' : '';

        return `
            <div class="form-group d-flex flex-column mb-2">
                <label for="${rl}}" class="text-uppercase mb-2 mt-3 text-start">${text}</label>
                <div class="position-relative">
                    <input type="${type}" id="${rl}}" name="${rl}}" placeholder="${placeholder}"  class="mb-3" ${required}>
                    
                    ${
                        this.state.errors.length > 0
                            ? 
                            `<error-alert>{{translator.translate(state.errors)}}</error-alert>`
                            : 
                            ''
                    }
                    
                </div>
            </div>
        `;
    }
});
