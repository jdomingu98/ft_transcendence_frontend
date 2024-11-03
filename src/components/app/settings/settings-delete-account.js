
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
                SnackbarService.addToast({
                    title: this.translator.translate('Cuenta borrada con éxito'),
                    body: this.translator.translate('Esperamos volver a verte pronto')
                });
                localStorage.clear();
                NavigatorService.goToLandingPage();
            })
            .catch(() => {
                SnackbarService.addToast({
                    title: this.translator.translate('Error al borrar la cuenta'),
                    body: this.translator.translate('Por favor, inténtalo más tarde')
                });
            });
    }

    bind() {
        this.subscribe('button', 'click', () => this.deleteUser());
    }

    render() {
        return `
            <div class="mt-3 mb-5 row">
                <div id='${this.sectionId}'>
                    <h2-text color="var(--app-secondary-color)">Delete Account</h2-text>
                </div>
                <div class="my-4 text-white" style="width:85%; font-size: 1.2rem">
                    <p class="paragraph mb-4">We are sorry if something wasn’t to your liking.</p>
                    <p class="paragraph mb-4">Before you leave the site, please note that you will need to re-register to access the site again, as all your details will be deleted.</p>
                    <p class="paragraph mb-5">Hope we will see you soon in the future,</p>
                    <p class="paragraph">The Transcendence team</p>
                </div>
                <button class="primary-red-btn primary-btn px-0 border-0 fw-bold text-uppercase rounded-pill">Delete account permanently</button>
            </div>
        `;
    }
});