import WebComponent, { Component } from '#WebComponent';

//import { DEFAULT_PROFILE_IMG } from '/src/const/index.js';

import css from './profile-header.css?inline';

const username = 'jDomingu98';
const position = '42';
const points = '10042';
const srcProfilePicture = '/src/resources/devs/jdomingu.png'; //DEFAULT_PROFILE_IMG;

const myProfile = window.location.pathname === '/app/profile/me';
const friendId = myProfile ? 'friend-list' : 'add-friend';

export default Component ({
    tagName: 'profile-header',
    styleCSS: css
},

class ProfileHeader extends WebComponent {

    init() {
        this.state = {
            status: [{
                connected: 'CONNECTED',
                disconnected: 'DISCONNECTED',
                searching: 'SEARCHING',
                playing: 'PLAYING'
            }]
        };
    }

    render() {
        return `
            <div class="d-flex align-items-center profile-header">
                <div class="d-inline-flex p-3 mx-3 profile-glask">
                    <img src='${srcProfilePicture}' class="rounded-circle mx-3 object-fit-cover" style="width: 100px; height: 100px;" alt="User Image">
                    <div class="profile-info">
                        <h2 class="mx-0 my-1">${username}</h2>
                        <div class="d-flex col">
                            <div class="mx-0 my-2 d-flex row gap-1 pr-0">
                                <p>{{ translator.translate("PROFILE.HEADER.POSITION") }}
                                    <span class="fw-bold">${position}</span>
                                </p>
                                <p> {{ translator.translate("PROFILE.HEADER.POINTS") }}
                                    <span class="fw-bold">${points}</span>
                                    {{ translator.translate("LEADERBOARD.PTS") }}
                                </p>
                            </div>
                            <primary-button id='${friendId}' w="200px" h="100px">
                                ${ myProfile ? '{{ translator.translate("PROFILE.HEADER.FRIEND.LIST_FRIENDS") }}' : '{{ translator.translate("PROFILE.HEADER.FRIEND.ADD_FRIEND") }}' }
                            </primary-button>
                        </div>
                        <div class="d-flex align-items-center mt-2" style="gap: 5px;">
                            <div class="rounded-circle " style="width:16px; height:16px; background-color: var(--app-green-color);"></div>
                                <p class="m-0" style="font-size: 1rem;">
                                    <span style="color: var(--app-green-color)"> {{ translator.translate("PROFILE.HEADER.STATUS." + state.status[0].connected)}} </span>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});