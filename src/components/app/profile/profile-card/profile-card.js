import WebComponent, { Component } from '#WebComponent';

import css from './profile-card.css?inline';

export default Component ({
    tagName: 'profile-card',
    styleCSS: css
},

class ProfileCard extends WebComponent {
    render() {
        return `
            <profile-search></profile-search>
            <div class="container d-flex flex-column justify-content-center align-items-center p-3 text-white card-container">
                <div class="w-100 mx-auto my-3 pb-4 profile-container">
                    <profile-header></profile-header>
                    <profile-stats></profile-stats>
                </div>
                <div class="w-100 mx-auto my-3 pb-4 profile-container">
                    <div class="mt-4">
                        <profile-history></profile-history>
                    </div>
                </div>
            </div>
        `;
    }
});