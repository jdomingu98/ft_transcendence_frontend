import WebComponent, { Component, Router } from '#WebComponent';
import NavigatorService from '#services/NavigatorService';

import css from './profile-search.css?inline';

export default Component ({
    tagName: 'profile-search',
    styleCSS: css
},

class ProfileSearch extends WebComponent {

    init() {
        const query = Router.getQuery();
        this.state = {
            searchTerm: query.username || ''
        };
    }

    redirectToSearchPage() {
        const searchTerm = this.shadowRoot.querySelector('#input-control').value.trim();
        if (searchTerm && searchTerm !== this.state.searchTerm)
            NavigatorService.searchUser(encodeURIComponent(searchTerm));
    }

    bind() {
        this.subscribe('#input-control', 'keydown', e => {
            if (e.key === 'Enter') {
                this.redirectToSearchPage();
            }
        });

        this.subscribe('#search-icon', 'click', () => {
            this.redirectToSearchPage();
        });
    }

    render() {
        return `
            <div class="container my-4">
                <div class="position-relative my-0 mx-auto searchbar">
                    <i
                        id="search-icon"
                        class="bi bi-search position-absolute top-50 translate-middle-y text-white"
                        style="cursor:pointer; left: 1rem; padding: 0.375rem;"
                    ></i>
                    <input
                        type="search"
                        id="input-control"
                        [value]="decodeURIComponent(state.searchTerm)"
                        class="form-control ps-5"
                        [placeholder]="translator.translate('PROFILE.SEARCH')"
                        [aria-label]="translator.translate('PROFILE.SEARCH')"
                    >
                </div>
            </div>
        `;
    }
});