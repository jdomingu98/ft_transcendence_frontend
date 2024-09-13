import WebComponent, { Component} from '#WebComponent';
import css from './form-field.css?inline';


export default Component ({
    tagName: 'form-field',
    styleCSS: css
},

class FormField extends WebComponent {

    init(){
        this.state = {
            isPasswordField: this.getAttribute('type') === 'password'
        };
    }
    get value() {
        return this._getDOM().querySelector('input').value;
    }

    togglePasswordVisibility() {
        const input = this._getDOM().querySelector('input');
        if(input.type === 'password')
            input.type = 'text';
        else
            input.type = 'password';
    }

    bind(){
        if(this.state.isPasswordField)
            this.subscribe('.bi-eye', 'click', (() => this.togglePasswordVisibility()));
    }

    render() {
        const name = this.getAttribute('name') || 'input';
        const type = this.getAttribute('type') || 'text';
        const error = this.getAttribute('error') || '';
        const placeholder = this.getAttribute('placeholder') || '';
        const labelMsg = this.getAttribute('labelMsg') || '';
        const isRequired = this.getAttribute('required') || '';
        const required = isRequired ? 'required' : '';
        const red_border = 'red-border';

        return `
            <div class="form-group d-flex flex-column">
                <label for="${name}" class="text-uppercase text-start">${labelMsg}</label>
                <div class="position-relative">
                    <input type="${type}" id="${name}" name="${name}" placeholder="${placeholder}" class="form-input ${error.length > 0 ? red_border : ''}" ${required}>
                    ${this.state.isPasswordField ? `
                        <span class="toggle-password">
                            <i class="bi bi-eye"></i>
                        </span>` : ''}
                    ${ error.length > 0 ? `<error-alert>${this.translator.translate(error)}</error-alert>` : '' } 
                </div>
            </div>
        `;
    }
});
