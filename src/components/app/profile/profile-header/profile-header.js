import WebComponent, { Component } from '#WebComponent';

//import { DEFAULT_PROFILE_IMG } from '/src/const/index.js';

import css from './profile-header.css?inline';

const username = 'jDomingu98';
const position = '42';
const srcProfilePicture = '/src/resources/devs/jdomingu.png'; //DEFAULT_PROFILE_IMG;

export default Component ({
    tagName: 'profile-header',
    styleCSS: css
},

class ProfileHeader extends WebComponent {

    init() {
        this.state = {
            status: [{
                connected: '{{ translator.translate("PROFILE.HEADER.STATUS.CONNECTED") }}',
                disconnected: '{{ translator.translate("PROFILE.HEADER.STATUS.DISCONNECTED") }}',
                searching: '{{ translator.translate("PROFILE.HEADER.STATUS.SEARCHING") }}',
                playing: '{{ translator.translate("PROFILE.HEADER.STATUS.PLAYING") }}'
            }]
        };
    }

    render() {
        return `
            <div class="profile-header">
                <div class="profile-glask">
                    <img src='${srcProfilePicture}' style="width: 100px; height:100px;"alt="User Image" class="profile-img">
                    <div class="profile-info">
                        <h2>${username}</h2>
                        <p>{{ translator.translate("PROFILE.HEADER.POSITION") }} <span class="fw-bold">${position}</span></p>
                        <div class="d-flex align-items-center mt-2" style="gap: 5px;">
                            <div class="rounded-circle" style="width:16px; height:16px; background-color: #8DDAB5;"></div>
                            <p style="margin: 0; font-size: 1rem;"><span style="color: #8DDAB5">${this.state.status[0].connected}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});