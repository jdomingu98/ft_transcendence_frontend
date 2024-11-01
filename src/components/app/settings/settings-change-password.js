
import WebComponent, { Component } from '#WebComponent';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-change-password',
    styleCSS: css
},

class SettingsChangePassword extends WebComponent {

    id = this.getAttribute('id');

    bind() {
        this.subscribeAll('.togglePassword', 'click', e => {
            const input = e.target.closest('.password-container').querySelector('input');
            const icon = e.target.closest('.togglePassword').querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    }

    render() {
        return `
            <div class="my-5 row">
                <div id='${this.id}'>
                    <h2-text color="var(--app-secondary-color)">Change Password</h2-text>
                </div>
                <div class="my-4">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">new Password</sub-header-text>
                    </div>
                    <div class="w-100 password-container">
                        <input type="password" class="p-3" name="password-settings" [placeholder]="translator.translate('LANDING.FORMS.PASSWORD_PHOLDER')" aria-label="Password input field">
                        <span class="togglePassword">
                            <i class='bi bi-eye'></i>
                        </span>
                    </div>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Confirm new password</sub-header-text>
                    </div>
                    <div class="w-100 password-container">
                        <input type="password" class="p-3" name="confirm-password-settings" [placeholder]="translator.translate('LANDING.FORMS.CONFIRM_PASSWORD_PHOLDER')" aria-label="Confirm password input field">
                        <span class="togglePassword">
                            <i class='bi bi-eye'></i>
                        </span>
                    </div>
                </div>
                <primary-button w="85%" h="62px">Update password</primary-button>
            </div>
        `;
    }
});