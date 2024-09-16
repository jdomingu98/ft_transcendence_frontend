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

    closeEsc = e => {
        if (e.key === 'Escape') {
            this.emit('CLOSE_MODAL');
        }
    };

    bind() {
        this.subscribe('.overlay', 'click', () => this.emit('CLOSE_MODAL'));

        this.subscribe('register-section', 'CLOSE_MODAL', () => this.emit('CLOSE_MODAL'));

        document.addEventListener('keydown', this.closeEsc);
        return () => {
            document.removeEventListener('keydown', this.closeEsc);
        };
    }

    render() {
        return `
                <div class="overlay"></div>
                <div class="modal-form">     
                    <div class="img-section"></div>
                        <register-section></register-section>
                    </div>
                </div>
            `;
    }
}
);
