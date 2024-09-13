import WebComponent, { Component} from '#WebComponent';
import css from './box-form-field.css?inline';


export default Component ({
    tagName: 'box-form-field',
    styleCSS: css
},

class BoxFormField extends WebComponent {

    init() {
        this.state = {
            errors: this.getAttribute('error') || '',
        };
    }

    render() {
        this.state.errors = this.getAttribute('error') || '';
        const content = this.innerHTML || '';
        return ` 
            <div class="terms-group d-flex text-start align-items-center position-relative ">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">${content}</label>
                ${this.state.errors.length > 0 ? ' <error-alert top=30px">{{translator.translate(state.errors)}}</error-alert>' : ''}
            </div>
        `;
    }
});
