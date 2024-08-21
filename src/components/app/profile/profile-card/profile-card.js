import WebComponent, { Component } from '#WebComponent';

import { ProfileHeader, ProfileHistory, ProfileStats } from '/src/components/app/profile';

import css from './profile-card.css?inline';

export default Component ({
    tagName: 'profile-card',
    styleCSS: css
},

class ProfileCard extends WebComponent {
    render() {
        return `
            <profile-search></profile-search>
            <div class="card-container container">
                <div class="profile-container">
                    <profile-header></profile-header>
                    <profile-stats></profile-stats>
                </div>
                <div class="profile-container mt-2">
                    <div class="matches-container">
                        <profile-history></profile-history>
                    </div>
                </div>
            </div>
        `;
    }
});