import WebComponent, { Component } from '#WebComponent';

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
        const currentPath = window.location.pathname;
        const pathSegments = currentPath.split('/');
        const searchTerm = pathSegments.length === 0 ? '' : pathSegments[pathSegments.length - 1];

        return this.state.searchResults.filter(result => result.username.toLowerCase().startsWith(searchTerm.toLowerCase())).map( result =>
            `
                <div class="col-md-3 col-sm-6 mb-4">
                    <div class="card" style="background-color: var(--app-secondary-bg-color)">
                        <img src="${result.profileImg}" alt="${result.username}" style="object-fit: cover">
                        <div class="card-body">
                            <h5 class="card-title text-truncate text-white text-center">${result.username}</h5>
                        </div>
                    </div>
                </div>
            `).join('');
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