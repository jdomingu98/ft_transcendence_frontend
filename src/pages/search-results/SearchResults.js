import WebComponent, { Component, Router } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';

export default Component ({
    tagName: 'search-results'
},

class SearchResults extends WebComponent {

    init() {
        this.state = {
            searchResults: [
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

    makeSearchResultGrid() {
        const searchTerm = Router.getQuery().username || '';

        return this.state.searchResults.filter(result => result.username.toLowerCase().startsWith(searchTerm.toLowerCase())).map( result =>
            `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card mt-3" style="background-color: var(--app-secondary-bg-color)">
                        <img src="${result.profileImg}" alt="${result.username}" style="object-fit: cover">
                        <div class="card-body p-2">
                            <h5 class="card-title text-truncate text-white text-center" style="margin-top: 0.5rem">${result.username}</h5>
                        </div>
                    </div>
                </div>
            `).join('');
    }

    bind() {
        this.subscribeAll('.card img', 'click', e => {
            const username = e.target.alt; // Get the username from the image alt attribute
            const userData = this.state.searchResults.filter(result => result.username === username);
            NavigatorService.goToProfile(userData[0].id);
        });
    }

    render() {
        return `
            <profile-search></profile-search>
            <div class="container p-3 text-white" style="font-family: 'Outfit', sans-serif;">
                <div class="row">
                    ${ this.makeSearchResultGrid()}
                </div>
            </div>
        `;
    }
});