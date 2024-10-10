
import WebComponent, { Component } from '#WebComponent';
//import css from './settings-user-management.css?inline';

/*let username = '';
let profilePicture= '';
let banner= '';*/

export default Component ({
    tagName: 'settings-user-management',
    //styleCSS: css
},

class SettingsUserManagement extends WebComponent {

    id = this.getAttribute('id');

    /*bind() {
        this.subscribe('#username-settings-field input-field', 'change', e => {
            console.log("golis");
            username = e.target.value.trim();
            console.log(username);
        });

        this.subscribe('#picture-settings-field', 'change', e => {
            profilePicture = e.target.value.trim();
        });

        this.subscribe('#banner-settings-field', 'change', e => {
            banner = e.target.value.trim();
        });
    }*/

    render() {
        return `
            <div style="margin-top: 1000px">
                <div class="d-flex row justify-content-end align-items-center">
                    <div id='${this.id}' class="d-flex row justify-content-center align-items-center my-5">
                        <h2-text color="var(--app-secondary-color)">User Management</h2-text>
                        <profile-header username="" picture="" banner=""></profile-header>
                    </div>
                    <input-field
                        w="470px"
                        h="54px"
                        title="Username"
                        placeholder="Your new username"
                        aria-label="Username input field"
                    >
                    </input-field>
                    <input-field
                        w="470px"
                        h="54px"
                        type="email"
                        title="Email"
                        placeholder="Your new email address"
                        aria-label="Email input field"
                    >
                    </input-field>
                    <input-field
                        w="470px"
                        h="54px"
                        id="picture-settings-field"
                        title="Profile Picture"
                        type="file"
                        name="upload-profile-img"
                        aria-label="Upload Profile Image"
                    >
                    </input-field>
                    <input-field
                        w="470px"
                        h="54px"
                        id="banner-settings-field"
                        title="Background Banner"
                        type="file"
                        name="upload-background-img"
                        aria-label="Upload Background Image"
                    >
                    </input-field>
                    <div class="mt-5 mb-3">
                        <sub-header-text color="var(--app-secondary-color)">Language</sub-header-text>
                    </div>
                    <div class="mb-5">
                        <language-selector w="470px" h="54px" ></language-selector>
                    </div>
                    <primary-button w="470px" h="54px">Save Changes</primary-button>
                </div>
        `;
    }
});