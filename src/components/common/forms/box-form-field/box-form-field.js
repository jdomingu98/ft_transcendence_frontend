import WebComponent, { Component} from '#WebComponent';
import css from './box-form-field.css?inline';


export default Component ({
    tagName: 'box-form-field',
    styleCSS: css
},

class BoxFormField extends WebComponent {
    render() {
        return ` 
            <div class="terms-group d-flex align-items-center mt-3 mb-3 position-relative ">
                <input type="checkbox" id="terms" name="terms" required>
                <label for="terms">
                {{ translator.translate("LANDING.SPAN.ACCEPT") }} <a href="/terms-and-conditions" class="terms-link" target="_blank">{{ translator.translate("LANDING.SPAN.TERMS_CONDITIONS") }}</a>
                </label>
            </div>
        `;
    }
});