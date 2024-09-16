import WebComponent, { Component} from '#WebComponent';
import css from './box-form-field.css?inline';


export default Component ({
    tagName: 'box-form-field',
    styleCSS: css
},

class BoxFormField extends WebComponent {

    init() {
        this.state = {
            error: this.getAttribute('error') || '',
        };
    }

    render() {
        this.state.error = this.getAttribute('error') || '';
        const content = this.innerHTML || '';
        return ` 
            <div class="terms-group d-flex text-start align-items-center position-relative ${this.state.error.length > 0 ? 'mb-3' : ''}">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">${content}</label>
                ${this.state.error.length > 0 ? ' <error-alert top=35px">{{translator.translate(state.error)}}</error-alert>' : ''}
            </div>
        `;
    }
});
