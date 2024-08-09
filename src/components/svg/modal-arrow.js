import '#svg';
import { Component, WebComponent } from '#WebComponent';


export default Component ({
    tagName: 'modal-arrow'
},

class ModalArrow extends WebComponent {
    render() {

        return `
            <button class="btn btn-primary p-0 text-light d-flex mt-3 ms-4" style="background-color: transparent; border:none;">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-arrow-left  " viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
                </svg>
            </button>
        `;
    }
});
