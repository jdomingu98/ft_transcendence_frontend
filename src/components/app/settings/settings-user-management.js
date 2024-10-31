
import WebComponent, { Component } from '#WebComponent';
import css from './settings-common-styles.css?inline';

export default Component ({
    tagName: 'settings-user-management',
    styleCSS: css
},
class SettingsUserManagement extends WebComponent {

    id = this.getAttribute('id');

    init() {
        this.state = {
            username: '',
            email: '',
            profilePicture: '',
            banner: '',
            language: '',
            visibility: 'private'
        };
    }

    bind() {
        this.subscribe('input[name="username-settings"]', 'input', e => this.state.username = e.target.value.trim());

        this.subscribe('input[name="email-settings"]', 'input', e => this.state.email = e.target.value.trim());

        this.subscribe('input[name="profile-picture-settings"]', 'change', e => {
            const selectedFile = this._getDOM().getElementById('profile-filename');
            if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/gif') {
                this.state.profilePicture = e.target.files[0].name;
                selectedFile.classList.remove('text-error');
                selectedFile.textContent = `Selected file: ${this.state.profilePicture}`;
            }
            else {
                selectedFile.textContent = 'Please select a valid image file';
                selectedFile.classList.add('text-error');
            }
        });

        this.subscribe('input[name="banner-settings"]', 'change', e => {
            const selectedFile = this._getDOM().getElementById('banner-filename');
            if (e.target.files[0].type === 'image/png' || e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/gif') {
                this.state.banner = e.target.files[0].name;
                selectedFile.classList.remove('text-error');
                selectedFile.textContent = `Selected file: ${this.state.banner}`;
            } else {
                selectedFile.textContent = 'Please select a valid image file';
                selectedFile.classList.add('text-error');
            }
        });

        this.subscribe('#visibility-selector', 'change', e => this.state.visibility = e.target.value);

    }

    render() {
        return `
            <div class="my-3 row">
                <div id='${this.id}' class="d-flex flex-column my-5 gap-4" style="width: 85%">
                    <h2-text color="var(--app-secondary-color)">User Management</h2-text>
                    <profile-header username="${this.state.username}" profilePicture="${this.state.profilePicture}" banner="${this.state.banner}"></profile-header>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Username</sub-header-text>
                    </div>
                    <input type="text" class="p-3" name="username-settings" placeholder="Your new username" aria-label="Username input field"></input>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Email</sub-header-text>
                    </div>
                    <input type="email" class="p-3" name="email-settings" placeholder="Your new email address" aria-label="Email input field"></input>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Profile Picture</sub-header-text>
                        <p id="profile-filename" class="mt-2 text-white file-selected">No file selected</p>
                    </div>
                    <input type="file" class="p-3" name="profile-picture-settings" aria-label="Profile picture input field" [data-content]="translator.translate('SETTINGS.USER_MANAGEMENT.PROFILE_IMG_PHOLD')"></input>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Background Banner</sub-header-text>
                        <p id="banner-filename" class="mt-2 text-white file-selected">No file selected</p>
                    </div>
                    <input type="file" class="p-3" name="banner-settings" aria-label="Banner input field" [data-content]="translator.translate('SETTINGS.USER_MANAGEMENT.BACKGROUND_IMG_PHOLD')"></input>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Profile visibility</sub-header-text>
                    </div>
                    <select id="visibility-selector" default="${this.state.visibility}" class="form-select text-uppercase text-white d-flex justify-content-start" aria-label="Profile visibility selector">
                        <option value="public">Public: All user can see your profile information</option>
                        <option value="private">Private: Only your friends can see your profile information</option>
                        <option value="anonymous">Anonymous: Nobody can see your information but you</option>
                    </select>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Language</sub-header-text>
                    </div>
                    <div class="d-flex justify-content-start" width="85%">
                        <language-selector w="850px" h="62px" ></language-selector>
                    </div>
                </div>
                <primary-button w="85%" h="62px">Save Changes</primary-button>
            </div>
        `;
    }
});