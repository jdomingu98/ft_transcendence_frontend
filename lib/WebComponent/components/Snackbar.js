import Component from '../Component';
import { SnackbarService } from '#services/SnackbarService';
import { Toast } from 'bootstrap';
import WebComponent from '../WebComponent';

export default Component({
    tagName: 'snackbar-container',
},
class SnackBarContainer extends WebComponent {
    static toastId = 0;

    createToast(id, title, body, subtitle) {
        const toast = document.createElement('div');
        toast.id = id;
        toast.classList.add('toast');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('data-bs-delay', '2500');
        // toast.setAttribute('data-bs-autohide', 'false');
        toast.innerHTML = `
            ${ title ? `<div class="toast-header">
                <img src="/resources/favicons/favicon-16x16.webp" class="pe-2" />
                <strong class="me-auto">${title}</strong>
                ${ subtitle ? `<small class="text-body-secondary">${subtitle}</small>` : ''}
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>` : ''}
            <div class="d-flex">
                ${ body ? `<div class="toast-body">${body}</div>` : ''}
                ${ !title ? '<button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' : '' }
            </div>
        `;
        
        return new Promise(resolve => setTimeout(() => {
            this._getDOM().querySelector('.toast-container').appendChild(toast);
            resolve(new Toast(toast));
        }, 100));
    }

    addToast = event => {
        const { title, body, subtitle } = event.detail.message;
        const id = `toast-${SnackBarContainer.toastId++}`;
        
        this.createToast(id, title, body, subtitle).then(toast => {
            toast.show();
            toast._element.addEventListener('hidden.bs.toast', () => {
                const toast = this._getDOM().getElementById(`${id}`);
                toast.remove();
            });
        })
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
                <div class="position-fixed toast-container top-0 end-0 mt-3 me-3"></div>
            </div>
        `;
    }
});