import '#svg';
import WebComponent, { Component } from '#WebComponent';


export default Component ({
    tagName: 'close-modal'
},

class CloseModal extends WebComponent {
    render() {

        return `
            <button class="btn btn-primary p-0 text-light d-flex mt-4 ms-4" style="background-color: transparent; border:none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
                </svg>
            </button>
        `;
    }
});