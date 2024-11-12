import WebComponent, { Component } from '#WebComponent';
import { DEFAULT_PROFILE_IMG } from '#const';
import UserService from '#services/UserService';

export default Component ({
    tagName: 'profile-friendship',
    styleCSS: `
        .pagination-button {
            padding: 5px 15px;
            border-radius: 5px;
            cursor: pointer;
        }

        .pagination-button:hover {
            background-color: var(--app-element-hover-color);
            transition: all .4s ease-in-out;
        }
    `
},

class ProfileFriendship extends WebComponent {
    init() {
        this.state = {
            maxPages: 1,
            friendList: []
        };
        this.setPage(1);
    }

    setPage(page) {
        if (page > 0 && page <= this.state.maxPages) {
            this.currentPage = page;
            this.getFriends(page);
        }
    }

    getFriends(page) {
        const userId = this.getAttribute('userId');
        UserService.getUsers({ paginate: true, page, friends: userId })
            .then(page => this.setState({ friendList: page.results.data, maxPages: Math.ceil(page.count / page.results.numItems) }));
    }

    makeFriendshipGrid() {
        return this.state.friendList.map(friend =>`
            <div class="col-md-2">
                <router-link href="/app/profile/${friend.id}">
                    <div class="card mt-3" style="cursor: pointer; background-color: var(--app-primary-color)">
                        <img src="${friend.profile_img ?? DEFAULT_PROFILE_IMG}" alt="${friend.username}" style="object-fit: cover">
                        <div class="card-body p-2">
                            <h5 class="card-title text-truncate text-white text-center" style="margin-top: 0.5rem">${friend.username}</h5>
                        </div>
                    </div>
                </router-link>
            </div>
        `).join('');
    }

    bind() {
        this.subscribe('#prev-page', 'click', () => this.setPage(this.currentPage - 1));
        this.subscribe('#next-page', 'click', () => this.setPage(this.currentPage + 1));
    }

    render() {
        return `
            <div class="container p-3">
                <h4 class="fw-bold text-white mb-4">{{ translator.translate("PROFILE.FRIENDS_LIST_TITLE") }}</h4>
                <div class="row">
                    ${this.state.friendList.length > 0 ? this.makeFriendshipGrid() : `
                        <div class="col-md-12 text-center">
                            <h5 class="text-white">
                                {{ translator.translate("PROFILE.FRIENDS_LIST_EMPTY") }}
                            </h5>
                        </div>
                    `}
                </div>
            </div>
            ${ this.state.friendList.length > 0 ? `<div class="d-flex align-items-center justify-content-evenly text-white mt-4">
                <span id="prev-page" class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.PREVIOUS") }}
                </span>
                <div>
                    <span>{{ currentPage }}</span>
                    <span>{{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.OF") }}</span>
                    <span>{{ state.maxPages }}</span>
                </div>
                <span id="next-page" class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.NEXT") }}
                </span>
            </div>` : ''}
        `;
    }
});