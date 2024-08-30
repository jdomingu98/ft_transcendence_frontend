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
            errors: []
        };
    }

    get value() {
        return this._getDOM().querySelector('input').value;
    }


    bind() {
        this.subscribe('input', 'keydown', () => {
            this.setState({
                ...this.state,
                errors: [],
            });
        });
    }

    render() {
        const rl = this.getAttribute('rl') || 'input}';
        const text = this.getAttribute('text') || 'text';
        const type = this.getAttribute('type') || 'type';
        const placeholder = this.getAttribute('placeholder') || 'Enter your email or username';
        const isRequired = this.getAttribute('required') || '';
        const required = isRequired ? 'required' : '';
        this.state.errors = this.getAttribute('error') || [];

        return `
            <div class="form-group d-flex flex-column mb-2">
                <label for="${rl}}" class="text-uppercase mb-3 mt-2 text-start">${text}</label>
                <div class="position-relative">
                    <input type="${type}" id="${rl}}" name="${rl}}" placeholder="${placeholder}" class="mb-3" ${required}>
                    <div id="errorMessage" class="error-alert hidden">
                        <span class="error-icon">⚠️</span>
                        <span class="error-msg"></span>
                    </div>
                </div>
                ${
                    Array.isArray(this.state.errors) && this.state.errors.length > 0
                        ? this.state.errors.map(msg => `<span>${msg}</span>`).join('') : ''
                }
            </div>
        `;
    }
});