import WebComponent, { Component } from '#WebComponent';

import { ProfileCard } from '/src/components/app/profile';

export default Component ({
    tagName: 'profile-page'
},

class ProfilePage extends WebComponent {
    render() {
        return `
            <profile-card></profile-card>
        `;
    }
});