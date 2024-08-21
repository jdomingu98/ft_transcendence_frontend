import WebComponent, { Component } from '#WebComponent';

import css from './profile-header.css?inline';

import { DEFAULT_PROFILE_IMG } from '/src/const/index.js';

const username = 'jDomingu98';
const position = '42';
const srcProfilePicture = '/src/resources/devs/jdomingu.png';//DEFAULT_PROFILE_IMG;

export default Component ({
    tagName: 'profile-header',
    styleCSS: css
},

class ProfileHeader extends WebComponent {
    render() {
        return `
            <div class="profile-header">
                <div class="profile-glask">
                    <img src='${srcProfilePicture}' style="width: 100px; height:100px;"alt="User Image" class="profile-img">
                    <div class="profile-info">
                        <h2>${username}</h2>
                        <p>Position <span class="fw-bold">${position}</span></p>
                        <div class="d-flex align-items-center mt-2" style="gap: 5px;">
                            <div class="rounded-circle" style="width:16px; height:16px; background-color: #8DDAB5;"></div>
                            <p style="margin: 0; font-size: 16px;"><span style="color: #8DDAB5">Connected</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});