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
        const { code } = Router.getQuery();
        if (!code)
            NavigatorService.goToErrorPage('OAUTH.REDIRECT.NO_CODE');
        else {
            AuthService.oauthLogin(code)
                .then(({ access_token, refresh_token }) => {
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    ToastService.addToast({ title: 'Login con 42', body: 'Ud. se ha logueado exitosamente' });
                    NavigatorService.goToHome();
                })
                .catch(({ error }) => NavigatorService.goToErrorPage(error));
        }
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
                    </div>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
}
);

