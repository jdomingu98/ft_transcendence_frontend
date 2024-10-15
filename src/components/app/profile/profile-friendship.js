import WebComponent, { Component } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';

const currentPage = 10;
const maxPages = 10;

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
            friendList: [
                {
                    username: 'cMoraleS',
                    profileImg: '/src/resources/devs/cmorales.jpg',
                    id: 1
                },
                {
                    username: 'jdomingu98',
                    profileImg: '/src/resources/devs/jdomingu.png',
                    id: 2
                },
                {
                    username: 'aTRuJiLl',
                    profileImg: '/src/resources/devs/atrujill.jpg',
                    id: 3
                },
                {
                    username: 'castor-afanoso',
                    profileImg: '/src/resources/devs/aruzafa-.jpg',
                    id: 4
                },
                {
                    username: 'cMoraleSs',
                    profileImg: '/src/resources/devs/cmorales.jpg',
                    id: 5
                },
                {
                    username: 'jdomingu9',
                    profileImg: '/src/resources/devs/jdomingu.png',
                    id: 6
                },
                {
                    username: 'aTRuJiL',
                    profileImg: '/src/resources/devs/atrujill.jpg',
                    id: 7
                },
                {
                    username: 'castorAfanoso',
                    profileImg: '/src/resources/devs/aruzafa-.jpg',
                    id: 8
                },
                {
                    username: 'cMorale',
                    profileImg: '/src/resources/devs/cmorales.jpg',
                    id: 9
                },
                {
                    username: 'jdomingu',
                    profileImg: '/src/resources/devs/jdomingu.png',
                    id: 10
                }
            ]
        };
    }

    makeFriendshipGrid() {
        return this.state.friendList.map( friend =>
            `
                <div class="col-md-2">
                    <div class="card mt-3" style="cursor: pointer; background-color: var(--app-primary-color)">
                        <img src="${friend.profileImg}" alt="${friend.username}" style="object-fit: cover">
                        <div class="card-body p-2">
                            <h5 class="card-title text-truncate text-white text-center" style="margin-top: 0.5rem">${friend.username}</h5>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    bind() {
        this.subscribeAll('.card', 'click', e => {
            const username = e.currentTarget.querySelector('.card-body h5').textContent;
            const userData = this.state.friendList.filter(friend => friend.username === username);
            NavigatorService.goToProfile(userData[0].id);
        });
    }

    render() {
        return `
            <div class="container p-3">
                <h4 class="fw-bold text-white mb-4">{{ translator.translate("PROFILE.FRIENDS_LIST_TITLE") }}</h4>
                <div class="row">
                    ${ this.makeFriendshipGrid() }
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-evenly text-white mt-4">
                <span class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.PREVIOUS") }}
                </span>
                <div>
                    <span>${currentPage}</span>
                    <span>{{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.OF") }}</span>
                    <span> ${maxPages}</span>
                </div>
                <span class="pagination-button">
                    {{ translator.translate("PROFILE.MATCH_HISTORY.PAGINATION.NEXT") }}
                </span>
            </div>
        `;
    }
});