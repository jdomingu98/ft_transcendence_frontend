import '/src/components/app/landing';

import WebComponent, { Component } from '#WebComponent';

import css from './Modal.css?inline'



export default Component({
    tagName: 'modal-1',
    styleCSS: css
},

class Modal extends WebComponent {
    render() {
        return `
            <div class="modal-form bg-primary">
                <div class="img-section">
                    <img src="src/resources/paddle1.jpeg">
                </div>
                <div class="data-section">
                    <h1 class="title">Transcendence</h1>
                    <p class ="sub-title"> Password assitance</p>
                    <span class="text">Enter your email or username and we’ll send you <br> instructions on how to reset your password.</span>
                    <div class="form-group">
                            <label for="email">Email or username</label>
                            <input type="text" id="email" name="email">
                    </div>
                    <primary-button color="red" w="30rem" h="68px">Send instructions</primary-button>
                </div>
            </div>
            <div class="overlay"></div>
        `;
    }
});