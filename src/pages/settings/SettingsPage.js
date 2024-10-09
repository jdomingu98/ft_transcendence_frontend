import '/src/components/app/settings';

import WebComponent, { Component } from '#WebComponent';

export default Component ({
    tagName: 'settings-page'
},

class SettingsPage extends WebComponent {

    render() {
        return `
            <div class="w-100 h-100 d-flex">
                <div class="position-relative col-md-4 d-flex justify-content-center  gap-5">
                    <div class="position-fixed top-50 d-flex row text-uppercase text-white text-center rounded p-3"
                        style="font-size: 1.2rem; transform: translateY(-50%); width: 400px; height: 500px; background-color: var(--app-secondary-bg-color)">
                        <div class="p-3">
                            <i class="bi bi-x me-1"></i>
                            <span>User Management</span>
                        </div>
                        <div class="p-3">
                            <i class="bi bi-shield-lock me-1"></i>
                            <span>Change Password</span>
                        </div>
                        <div class="p-3">
                            <i class="bi bi-key me-1"></i>
                            <span>Two Factor Authentication</span>
                        </div>
                        <div class="p-3">
                            <i class="bi bi-file-lock me-1"></i>
                            <span>Update Profile Visibility</span>
                        </div>
                        <div class="p-3">
                            <i class="bi bi-info-circle me-1"></i>
                            <span>About Transcendence</span>
                        </div>
                        <div class="p-3">
                            <i class="bi bi-trash me-1"></i>
                            <span>Delete Account</span>
                        </div>
                    </div>
                </div>
                <div class="col d-flex justify-content-center align-items-center">
                    <div class="d-flex row">
                        <settings-user-management></settings-user-management>
                    </div>
                </div>
            </div>
        `;
    }
});