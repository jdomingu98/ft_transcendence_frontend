import WebComponent, { Component } from '#WebComponent';

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
                },
                {
                    username: 'jdomingu98',
                    profileImg: '/src/resources/devs/jdomingu.png',
                },
                {
                    username: 'aTRuJiLl',
                    profileImg: '/src/resources/devs/atrujill.jpg',
                },
                {
                    username: 'castor-afanoso',
                    profileImg: '/src/resources/devs/aruzafa-.jpg',
                },
                {
                    username: 'cMoraleS',
                    profileImg: '/src/resources/devs/cmorales.jpg',
                },
                {
                    username: 'jdomingu98',
                    profileImg: '/src/resources/devs/jdomingu.png',
                },
                {
                    username: 'aTRuJiLl',
                    profileImg: '/src/resources/devs/atrujill.jpg',
                },
                {
                    username: 'castor-afanoso',
                    profileImg: '/src/resources/devs/aruzafa-.jpg',
                },
                {
                    username: 'cMoraleS',
                    profileImg: '/src/resources/devs/cmorales.jpg',
                },
                {
                    username: 'jdomingu98',
                    profileImg: '/src/resources/devs/jdomingu.png',
                }
            ]
        };
    }

    makeFriendshipGrid() {
        return this.state.friendList.map( friend =>
            `
                <div class="col-md-2">
                    <div class="card" style="background-color: var(--app-secondary-bg-color)">
                        <img src="${friend.profileImg}" alt="${friend.username}" style="object-fit: cover">
                        <div class="card-body">
                            <h5 class="card-title text-truncate text-white text-center">${friend.username}</h5>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    render() {
        return `
            <div class="container p-3">
                <h4 class="fw-bold text-white mb-5">Friends List</h4>
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