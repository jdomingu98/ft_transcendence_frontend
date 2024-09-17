import '/src/components/app/landing';
import './register-section/register-section';
import WebComponent, { Component } from '#WebComponent';
import css from './modal-card.css?inline';

export default Component({
    tagName: 'modal-card',
    styleCSS: css,
},

class ModalCard extends WebComponent {

    init() {
        this.state = {
            submitting: false,
            showRegister: true,
            errors: {}
        };
    }

    closeModal() {
        this.setState({
            ...this.state,
            showRegister: false,
        });
    }
    bind() {
        this.subscribe('.overlay', 'click', () => this.emit('CLOSE_MODAL'));
        this.subscribe('register-section', 'CLOSE_MODAL', () => this.emit('CLOSE_MODAL'));
    }

    render() {
        return `
                <div class="overlay"></div>
                <div class="modal-form">     
                    <div class="img-section">
                        <register-section></register-section>
                    </div>
                </div>
            `;
    }
}
);