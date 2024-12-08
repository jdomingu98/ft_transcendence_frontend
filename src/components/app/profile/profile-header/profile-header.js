import { DEFAULT_BANNER_IMG, DEFAULT_PROFILE_IMG, UserStatus } from '#const';

import WebComponent, { Component } from '#WebComponent';
import FriendService from '#services/FriendService';
import css from './profile-header.css?inline';

export default Component ({
    tagName: 'profile-header',
    styleCSS: css
},
class ProfileHeader extends WebComponent {

    init() {
        this.state = {
            isSettingsPage: window.location.pathname.includes('settings')
        };
    }

    getStatusColor(status) {
        return status === UserStatus.CONNECTED ? 'var(--app-green-color)' : '#DDDDDD';
    }

    get myProfile() {
        return window.location.pathname === '/app/me' || window.location.pathname === '/app/settings';
    }

    bind() {
        this.subscribe('#heart', 'click', () => {
            const id = this.getAttribute('id');
            const heartIcon = this._getDOM().getElementById('heart');
            if (!this.isFriend && !this.hasRequestedFriendship) {
                FriendService.requestFriendship(id).then(() => {
                    this.hasRequestedFriendship = true;
                    heartIcon.classList.add('friend-icon');
                });
            } else if (this.hasRequestedFriendship) {
                FriendService.cancelFriendshipRequest(id).then(() => {
                    heartIcon.classList.remove('friend-icon');
                    this.hasRequestedFriendship = false;
                });
            } else {
                FriendService.deleteFriendship(id).then(() => {
                    this.isFriend = false;
                    this.hasRequestedFriendship = false;
                    heartIcon.classList.add('hidden');
                    heartIcon.classList.remove('friend-icon');
                    setTimeout(() => {
                        heartIcon.classList.remove('bi-heart-fill');
                        heartIcon.classList.add('bi-heart');
                        heartIcon.classList.remove('hidden');
                    }, 300);
                });
            }
        });
    }

    render() {
        const templateUsername = this.getAttribute('username') ?? '';
        const templatePicture = this.getAttribute('profilePicture') ?? DEFAULT_PROFILE_IMG;
        const templateBanner = this.getAttribute('banner') ?? DEFAULT_BANNER_IMG;
        const connected = this.getAttribute('connected') ? UserStatus.CONNECTED : UserStatus.DISCONNECTED;
        const position = this.getAttribute('position') ?? '';
        const points = this.getAttribute('points') ?? '';
        this.isFriend = this.getAttribute('isFriend');
        this.hasRequestedFriendship = this.getAttribute('hasRequestedFriendship');

        return `
            <div class="d-flex align-items-center profile-header text-white" style="background-image: url(${templateBanner})">
                <div class="d-inline-flex p-3 mx-3 profile-glask">
                    <div class="position-relative">
                        <img src='${templatePicture}' class="rounded-circle mx-3 object-fit-cover" style="width: 100px; height: 100px;" alt="User Image">
                        ${ !this.myProfile ? `
                                <div class="position-absolute top-0" style="left:65%; font-size: 1.2rem; cursor: pointer;">
                                    ${ this.isFriend ? '<i id="heart" class="bi bi-heart-fill friend p-1"></i>' : `<i id="heart" class="friend bi bi-heart p-1 ${this.hasRequestedFriendship ? 'friend-icon' : ''}"></i>`}
                                </div>
                            ` : ''}
                    </div>
                    <div class="profile-info">
                        <h2 class="mx-0 my-1">${templateUsername}</h2>
                        ${ !this.state.isSettingsPage ? `
                            <div class="d-flex">
                                <div class="mx-0 my-2 gap-1">
                                    <p>{{ translator.translate("PROFILE.HEADER.POSITION") }}
                                        <span class="fw-bold">${position}</span>
                                    </p>
                                    <p> {{ translator.translate("PROFILE.HEADER.POINTS") }}
                                        <span class="fw-bold">${points}</span>
                                        {{ translator.translate("LEADERBOARD.PTS") }}
                                    </p>
                                </div>
                            </div>` : ''}
                        <div class="d-flex align-items-center mt-2" style="gap: 5px;">
                            <div class="rounded-circle " style="width:16px; height:16px; background-color:  ${this.getStatusColor(connected)};"></div>
                                <p class="m-0" style="font-size: 1rem;">
                                    <span style="color: ${this.getStatusColor(connected)}"> ${this.translator.translate('PROFILE.HEADER.STATUS.' + connected)} </span>
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});