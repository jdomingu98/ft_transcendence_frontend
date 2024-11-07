import WebComponent, { Component, Router } from '#WebComponent';
import AuthService from '#services/AuthService';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService.js';
import css from './OAuthRedirect.css?inline';

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
                .then(({ access_token, refresh_token, two_factor_enabled }) => {
                    two_factor_enabled
                        ? this.showOTPModal('username')
                        : this.loginSuccessfully(access_token, refresh_token);
                })
                .catch(({ error }) => NavigatorService.goToErrorPage(error));
        }
    }

    loginSuccessfully(access_token, refresh_token) {
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        SnackbarService.addToast({
            title: 'SNACKBAR.OAUTH_REDIRECT.TITLE',
            body: 'SNACKBAR.OAUTH_REDIRECT.DESC'
        });
        NavigatorService.goToHome();
    }

    showOTPModal(username) {
        const otpModal = this._getDOM().querySelector('landing-otp-modal');
        otpModal.openModal(username);
    }

    afterViewInit() {
        this.subscribe('landing-auth-modal', 'OPEN_OTP', ({detail}) => this.showOTPModal(detail));
    }

    render() {
        return `
            <landing-otp-modal></landing-otp-modal>
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

