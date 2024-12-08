import WebComponent, { Component, Router } from '#WebComponent';
import AuthService from '#services/AuthService';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService.js';
import css from './OAuthRedirect.css?inline';

document.querySelector('meta[name="description"]').content = 'OAuth redirect page. Please wait...';

export default Component({
    tagName: 'oauth-redirect',
    styleCSS: css,
},
class OAuthRedirect extends WebComponent {

    init() {
        const { code } = Router.getQuery();
        if (!code)
            NavigatorService.goToErrorPage('ERROR.OAUTH.NO_CODE');
        else {
            AuthService.oAuthLogin(code)
                .then(({ access_token, refresh_token }) => {
                    localStorage.setItem('access_token', access_token);
                    localStorage.setItem('refresh_token', refresh_token);
                    SnackbarService.addToast({
                        title: this.translator.translate('SNACKBAR.OAUTH_REDIRECT.TITLE'),
                        body: this.translator.translate('SNACKBAR.OAUTH_REDIRECT.DESC')
                    });
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
                        <h5 class="card-title">{{translator.translate("OAUTH.TITLE")}}</h5>
                        <p class="card-text">{{translator.translate("OAUTH.DESCRIPTION")}}</p>
                        <app-spinner></app-spinner>
                    </div>
                </div>
                <div id="footer-gradient" class="col-12"></div>
            </div>
        `;
    }
}
);

