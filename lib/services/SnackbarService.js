export class SnackbarService {
    static ADD_TOAST_EVENT = 'add-toast';

    static addToast(message) {
        const event = new CustomEvent(SnackbarService.ADD_TOAST_EVENT, {
            detail: {
                message: {
                    title: message.title,
                    subtitle: message.subtitle,
                    body: message.body,
                    duration: message.duration,
                },
            }
        });
        document.dispatchEvent(event);
    }
}