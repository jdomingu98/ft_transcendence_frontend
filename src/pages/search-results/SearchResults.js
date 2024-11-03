import WebComponent, { Component, Router } from '#WebComponent';
import FetchService from '#services/UserService';

export default Component ({
    tagName: 'search-results'
},

class SearchResults extends WebComponent {
    init() {
        this.state = { users: [] };
        const searchTerm = Router.getQuery().username || '';
        FetchService.getByUsername(searchTerm)
            .then(response => this.setState({ users: response }));
    }

    makeSearchResultGrid() {
        return this.state.users.map(result =>`
            <div class="col-md-3 col-sm-6 mb-4">
                <router-link href="/app/profile/${result.id}">
                    <div class="card mt-3" style="background-color: var(--app-secondary-bg-color)">
                        <img src="${result.profile_img}" alt="${result.username}" style="object-fit: cover">
                        <div class="card-body p-2">
                            <h5 class="card-title text-truncate text-white text-center" style="margin-top: 0.5rem">${result.username}</h5>
                        </div>
                    </div>
                </router-link>
            </div>
        `).join('');
    }

    render() {
        return `
            <profile-search></profile-search>
            <div class="container p-3 text-white" style="font-family: 'Outfit', sans-serif;">
                <div class="row">
                    ${this.makeSearchResultGrid()}
                </div>
            </div>
        `;
    }
});