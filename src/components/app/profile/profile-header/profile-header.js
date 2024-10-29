import WebComponent, { Component } from '#WebComponent';

//import { DEFAULT_PROFILE_IMG } from '#const';

import css from './profile-header.css?inline';

const username = 'jDomingu98';
const position = '42';
const points = '10042';
const srcProfilePicture = '/src/resources/devs/jdomingu.png'; //DEFAULT_PROFILE_IMG;

const myProfile = window.location.pathname === '/app/profile/me';

let isFriendRequested = false;
let isFriend = true;

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

    bind() {
        this.subscribe('#heart', 'click', () => {
            const heartIcon = this._getDOM().getElementById('heart');
            if (!isFriend && !isFriendRequested) {

                heartIcon.classList.add('friend-icon');
                //Update enum in database
                isFriendRequested = true;
            } else if (isFriendRequested) {
                heartIcon.classList.remove('friend-icon');
                //Update enum in database
                isFriendRequested = false;
            } else {
                //Delete friend
                heartIcon.classList.add('hidden');
                heartIcon.classList.remove('friend-icon');
                setTimeout(() => {
                    heartIcon.classList.remove('bi-heart-fill');
                    heartIcon.classList.add('bi-heart');

                    heartIcon.classList.remove('hidden');
                }, 300);
                //Update enum in database
                isFriend = false;
                isFriendRequested = false;
            }
        });
    }

    render() {
        const templateUsername = this.getAttribute('username') || username;
        const templatePicture = this.getAttribute('profilePicture') || srcProfilePicture;
        const templateBanner = this.getAttribute('banner') || 'https://iintra.freekb.es/banners/jdomingu-1676213124.gif';

        return `
            <div class="d-flex align-items-center profile-header text-white" style="background-image: url(${templateBanner})">
                <div class="d-inline-flex p-3 mx-3 profile-glask">
                    <div class="position-relative">
                        <img src='${srcProfilePicture}' class="rounded-circle mx-3 object-fit-cover" style="width: 100px; height: 100px;" alt="User Image">
                        ${ !myProfile ? `
                                <div class="position-absolute top-0" style="left:65%; font-size: 1.2rem; cursor: pointer;">
                                    ${ isFriend ? '<i id="heart" class="bi bi-heart-fill friend p-1"></i>' : '<i id="heart" class=" friend bi bi-heart p-1"></i>'}
                                </div>
                            ` : ''}
                    </div>
                    <div class="profile-info">
                        <h2 class="mx-0 my-1">${username}</h2>
                        <div class="d-flex col">
                            <div class="mx-0 my-2 d-flex row gap-1">
                                <p class="px-0">{{ translator.translate("PROFILE.HEADER.POSITION") }}
                                    <span class="fw-bold">${position}</span>
                                </p>
                                <p class="px-0"> {{ translator.translate("PROFILE.HEADER.POINTS") }}
                                    <span class="fw-bold">${points}</span>
                                    {{ translator.translate("LEADERBOARD.PTS") }}
                                </p>
                            </div>
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