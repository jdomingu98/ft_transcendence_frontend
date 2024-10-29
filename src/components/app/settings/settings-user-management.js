
import WebComponent, { Component } from '#WebComponent';
import css from './settings-common-styles.css?inline';

/*let username = '';
let profilePicture= '';
let banner= '';*/

export default Component ({
    tagName: 'settings-user-management',
    styleCSS: css
},

class SettingsUserManagement extends WebComponent {

    id = this.getAttribute('id');

    render() {
        return `
            <div class="my-3 row">
                <div id='${this.id}' class="d-flex flex-column my-5 gap-4" style="width: 85%">
                    <h2-text color="var(--app-secondary-color)">User Management</h2-text>
                    <profile-header username="" picture="" banner=""></profile-header>
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
                        <p class="mt-2 text-white file-selected">Selected file: ${this.profilePicture ?? ''}</p>
                    </div>
                    <input type="file" class="p-3" name="profile-picture-settings" aria-label="Profile picture input field" [data-content]="translator.translate('SETTINGS.USER_MANAGEMENT.PROFILE_IMG_PHOLD')"></input>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Background Banner</sub-header-text>
                        <p class="mt-2 text-white file-selected">Selected file: ${this.banner ?? ''}</p>
                    </div>
                    <input type="file" class="p-3" name="banner-settings" aria-label="Banner input field" [data-content]="translator.translate('SETTINGS.USER_MANAGEMENT.BACKGROUND_IMG_PHOLD')"></input>
                </div>
                <div class="mb-5">
                    <div class="my-3">
                        <sub-header-text color="var(--app-secondary-color)">Language</sub-header-text>
                    </div>
                    <div class="d-flex justify-content-start" width="85%">
                        <language-selector w="850px" h="62px" ></language-selector>
                    </div>
                </div>
                <primary-button w="850px" h="62px">Save Changes</primary-button>
            </div>
        `;
    }
});