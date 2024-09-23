import '../../components/common/spinner/app-spinner';
import WebComponent, { Component, Router } from '#WebComponent';
import AuthService from '#services/AuthService';
import NavigatorService from '#services/NavigatorService';
import { ToastService } from '#services/ToastService.js';
import css from './OAuthRedirect.css?inline';


export default Component({
    tagName: 'oauth-redirect',
    styleCSS: css,
},
class OAuthRedirect extends WebComponent {
    init() {
        const queries = Router.getQuery();
        const { code } = queries;
        if (code) {
            // AuthService.oauthLogin(code)
            //     .then(() => console.log('@TODO: set token in local storage'))
            //     .catch(() => NavigatorService.goToErrorPage('Failed to login'));
            AuthService.oauthLogin(code)
                .then(() => NavigatorService.goToHome())
                .catch(({ error }) => NavigatorService.goToErrorPage(error));
                // .catch(() => {
                //     ToastService.addToast({
                //         title: 'Login con 42',
                //         body: 'Ud. se ha logueado exitosamente',
                //     });
                //     NavigatorService.goToHome();
                // });
                // .catch(() => NavigatorService.goToErrorPage('OAUTH.REDIRECT.ERROR'));
                // .catch(() => NavigatorService.goTo404Page());
        } else {
            NavigatorService.goToErrorPage('OAUTH.REDIRECT.NO_CODE');
        }
    }

    bind() {
        this.subscribe('button', 'click', () => {
            ToastService.addToast({
                title: 'Success',
                body: 'You have logged in successfully',
            });
        });
    }

    render() {
        return `
            <div class="oauth-container position-relative overflow-hidden w-100 d-flex align-items-end">
                <div class="col-12 p-0 position-absolute rounded-circle lights top-light"></div>
                <div class="col-12 p-0 position-absolute rounded-circle lights middle-light"></div>
                <div class="card position-absolute top-50 start-50 translate-middle" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Iniciando sesión con 42.</h5>
                        <p class="card-text">Por favor, tenga muchisima paciencia, sus servidores son lentos.</p>
                        <app-spinner></app-spinner>
                        <button class="btn btn-primary mt-3">Ingresar</button>
                    </div>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
}
);

