import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';

import css from './modal-password-assistance.css?inline';

export default Component(
    {
        tagName: 'modal-password-assistance',
        styleCSS: css,
    },

    class ModalPasswordAssistance extends WebComponent {

        init() {
            this.state = {
                section: 'register'
            };
        }
        closeModal() {
            const overlay = this._getDOM().querySelector('.overlay');
            const modal = this._getDOM().querySelector('.modal-form');

            overlay.classList.add('hidden');
            modal.classList.add('hidden');
        }


        closeEsc = (e) => {
            const modal = this._getDOM().querySelector('.modal-form');
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                this.closeModal();
            }
        };

        bind() {
            this.subscribe('.overlay', 'click', () => {
                this.closeModal();
            });

            document.addEventListener('keydown', this.closeEsc);
            return () => {
                document.removeEventListener('keydown', this.closeEsc);
            };
        }

        render() {
            return `
        <div class="overlay hidden"></div>
        <div class="modal-form hidden"> 
            <img src="src/resources/paddle.jpeg" class="img-section">
            <div class="data-section">
                <modal-arrow></modal-arrow>
                <modal-h1-text id="pp">TRANSCENDENCE</modal-h1-text>
                <modal-h1-text color="var(--app-secondary-color);">Password assistance</modal-h1-text>
                <modal-span-text>Enter your email or username and we’ll send you <br> instructions on how to reset your password.</modal-span-text>
                <form>
                        <form-field text="email or username" placeholder="johndoe@gmail.com"></form-field>
                        <primary-button color="#8D8DDA" w="65%" h="68px" bootstrap="mt-3" animation='true'>Send instructions</primary-button>
                </form>
            </div>
        </div>
    `;
        }
    }
);
