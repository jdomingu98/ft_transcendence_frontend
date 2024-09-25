export class ToastService {
    static ADD_TOAST_EVENT = 'add-toast';

    static addToast(message) {
        const event = new CustomEvent(ToastService.ADD_TOAST_EVENT, {
            detail: {
                message: {
                    title: message.title,
                    body: message.body,
                }
            }
        });
        document.dispatchEvent(event);
    }
}