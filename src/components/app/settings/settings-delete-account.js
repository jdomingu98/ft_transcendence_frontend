
import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';
import { SnackbarService } from '#services/SnackbarService';
import UserService from '#services/UserService';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-delete-account',
    styleCSS: css
},
class SettingsDeleteAccount extends WebComponent {

    sectionId = this.getAttribute('sectionId');

    init() {
        this.state = {
            id: this.getMyId()
        };
    }

    getMyId() {
        UserService.getMyInfo().then(({ id }) => this.setState({ ...this.state, id }));
    };

    deleteUser() {
        UserService.delete(this.state.id)
            .then(() => {
                setTimeout(() => {
                    SnackbarService.addToast({
                        title: this.translator.translate('SNACKBAR.SETTINGS.DELETE_ACCOUNT_DONE.TITLE'),
                        body: this.translator.translate('SNACKBAR.SETTINGS.DELETE_ACCOUNT_DONE.DESC')
                    });
                }, 3000);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                NavigatorService.goToLandingPage();
            })
            .catch(() => {
                setTimeout(() => {
                    SnackbarService.addToast({
                        title: this.translator.translate('SNACKBAR.SETTINGS.DELETE_ACCOUNT_ERROR.TITLE'),
                        body: this.translator.translate('SNACKBAR.SETTINGS.DELETE_ACCOUNT_ERROR.DESC')
                    });
                }, 3000);
            });
    }

    bind() {
        this.subscribe('button', 'click', () => this.deleteUser());
    }

    render() {
        return `
            <div class="mt-3 mb-5 row">
                <div id='${this.sectionId}'>
                    <h2-text color="var(--app-secondary-color)">
                        {{ translator.translate('SETTINGS.SECTIONS.DELETE_ACCOUNT') }}
                    </h2-text>
                </div>
                <div class="my-4 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.DELETE_ACCOUNT.FIRST_PARAGRAPH') }}
                    </p>
                    <p class="paragraph mb-4">
                        {{ translator.translate('SETTINGS.DELETE_ACCOUNT.SECOND_PARAGRAPH') }}
                    </p>
                    <p class="paragraph mb-5">
                        {{ translator.translate('SETTINGS.DELETE_ACCOUNT.THIRD_PARAGRAPH') }}
                    </p>
                    <p class="paragraph">
                        {{ translator.translate('SETTINGS.DELETE_ACCOUNT.TEAM') }}
                    </p>
                </div>
                <button class="primary-red-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">
                    {{ translator.translate('SETTINGS.DELETE_ACCOUNT.DELETE') }}
                </button>
            </div>
        `;
    }
});