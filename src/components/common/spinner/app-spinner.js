import WebComponent, { Component } from '#WebComponent';

Component({
    tagName: 'app-spinner',
},
class Spinner extends WebComponent {
    init() {
        this.state = {
            SPINNER_SIZE: '7rem'
        };
    }

    render() {
        return `
          <div class="spinner-container d-flex justify-content-center align-items-center">
              <div class="spinner-grow text-light" style="width: 7rem; height: 7rem;"  role="status">
                  <svg-spinner [height]="state.SPINNER_SIZE" [width]="state.SPINNER_SIZE"></svg-spinner>
              </div>
          </div>
      `;
    }
}
);