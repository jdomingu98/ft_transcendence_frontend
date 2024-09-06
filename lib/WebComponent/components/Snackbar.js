import Component from '../Component';
import WebComponent from '../WebComponent';

export default Component({
    tagName: 'snackbar-container',
},
class SnackBarContainer extends WebComponent {
    render() {
        return `
        <div aria-live="polite" aria-atomic="true">
        <div class="toast">
          <div class="toast-header">
            <img src="..." class="rounded mr-2" alt="...">
            <strong class="mr-auto">Bootstrap</strong>
            <small>11 mins ago</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>
      </div>
    `;
    }
});