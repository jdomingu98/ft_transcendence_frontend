import WebComponent, { Component } from '#WebComponent';
import { SnackbarService } from '#services/SnackbarService.js';
import { Toast } from 'bootstrap';

export default Component({
    tagName: 'snackbar-container',
},
class SnackBarContainer extends WebComponent {
    static toastId = 0;

    init() {
        this.state = {
            toasts: []
        };
    }

    createToast(id, title, body, subtitle) {
        const toast = document.createElement('div');
        toast.id = id;
        toast.classList.add('toast');
        toast.setAttribute('aria-atomic', 'true');
        toast.innerHTML = `
            ${ title ? `<div class="toast-header">
                <img src="src/resources/favicons/favicon-16x16.png" class="pe-2" />
                <strong class="me-auto">${title}</strong>
                ${ subtitle ? `<small class="text-body-secondary">${subtitle}</small>` : ''}
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>` : ''}
            <div class="d-flex">
                ${ body ? `<div class="toast-body">${body}</div>` : ''}
                ${ !title ? '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' : '' }
            </div>
        `;
        this._getDOM().querySelector('.toast-container').appendChild(toast);
        return new Toast(toast);
    }

    addToast = event => {
        const { title, body, subtitle } = event.detail.message;
        const id = `toast-${SnackBarContainer.toastId++}`;

        // Bootstrap show toast:

        const toast = this.createToast(id, title, body, subtitle);
        toast.show();
        toast._element.addEventListener('hidden.bs.toast', () => {
            const toast = this._getDOM().getElementById(`${id}`);
            toast.remove();
        });
        setTimeout(() => this.removeToast(id), 2500);
    };

    removeToast = id => {
        const toast = this._getDOM().getElementById(`${id}`);
        Toast.getOrCreateInstance(toast).hide();
    };

    bind() {
        document.addEventListener(SnackbarService.ADD_TOAST_EVENT, this.addToast);

        return () => {
            document.removeEventListener(SnackbarService.ADD_TOAST_EVENT, this.addToast);
        };
    }

    render() {
        return `
        <div class="position-relative">
            <div class="toast-container top-0 end-0 mt-3 me-3"></div>
        </div>
    `;
    }
});