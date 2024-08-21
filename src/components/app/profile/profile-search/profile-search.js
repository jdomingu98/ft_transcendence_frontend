import WebComponent, { Component } from '#WebComponent';

import css from './profile-search.css?inline';

export default Component ({
    tagName: 'profile-search',
    styleCSS: css
},

class ProfileSearch extends WebComponent {

    render() {
        return `
            <div class="container my-4">
                <div class="position-relative my-0 mx-auto searchbar">
                    <i
                        class="bi bi-search position-absolute top-50 translate-middle-y search-icon"
                    ></i>
                    <input
                        type="search"
                        id="input-control"
                        class="form-control form-control-lg ps-5"
                        placeholder="Search users.."
                        aria-label="Search users..."
                    >
                </div>
            </div>
        `;
    }
});