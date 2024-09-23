import Component from '../../../lib/WebComponent/Component';
import WebComponent from '../../../lib/WebComponent/WebComponent';

Component({
    tagName: 'not-found-page',
    styleCSS: `
    .error-container {
        height: 100vh;
        background-color: var(--app-primary-bg-color);
        font-family: var(--app-primary-text-font);
    }

    .lights {
      width: 680px;
      height: 680px;
      filter: blur(306px);
      z-index: 0;
    }
    
    .top-light {
        top: -330px;
        left: 55px;
        background-color: var(--app-primary-color);
    }
    
    .middle-light {
        top: 540px;
        left: 1140px;
        background: var(--app-secondary-color);
    }
    
    #footer-gradient {
        background: var(--app-landing-footer-gradient);
        width: 100%;
        height: 10px;
        margin-top: 1rem;
    }
   
  `
},
class ErrorPage extends WebComponent {
    render() {
        return `
          <div class="error-container position-relative overflow-hidden w-100 d-flex align-items-end">
          <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
          <div class="col-12 p-0 position-absolute rounded-circle lights middle-light"></div>
          <div class="card position-absolute top-50 start-50 translate-middle d-flex align-items-center">
              <h5 class="card-title">ERROR.</h5>
              <p class="card-text">Pong not found</p>
              <app-spinner></app-spinner>
          </div>
          <div id="footer-gradient" class="col-12"></div>
      </div>
        `;
    }
});