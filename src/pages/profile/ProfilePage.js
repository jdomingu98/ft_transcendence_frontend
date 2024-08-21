import '/src/components/app/profile';

import WebComponent, { Component } from '#WebComponent';

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