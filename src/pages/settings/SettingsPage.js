import '/src/components/app/settings';

import WebComponent, { Component } from '#WebComponent';
import UserService from '#services/UserService';
import css from './SettingsPage.css?inline';

document.querySelector('meta[name="description"]').content = 'Change your password, enable two-factor authentication, and much more.';

export default Component ({
    tagName: 'settings-page',
    styleCSS: css
},
class SettingsPage extends WebComponent {

    init() {
        this.state = { user: null };
        UserService.getMyInfo().then(user => this.setState({...this.state, user }));
    }

    getSidebarElements() {
        return [{
            sidebarElementId: 'settings-user-management',
            iconClass: 'bi-person-circle',
            sectionName: '{{ translator.translate("SETTINGS.SECTIONS.USER_MANAGEMENT") }}',
            url: '#user-management',
            show: true,
        }, {
            sidebarElementId: 'settings-change-password',
            iconClass: 'bi-shield-lock',
            sectionName: '{{ translator.translate("SETTINGS.SECTIONS.CHANGE_PASSWORD") }}',
            url: '#change-password',
            show: true,
        }, {
            sidebarElementId: 'settings-two-factor',
            iconClass: 'bi-key',
            sectionName: `${ this.translator.translate('SETTINGS.SECTIONS.TWO_FACTOR_AUTH') }`,
            url: '#two-factor',
            show: !this.state.user?.is42,
        }, {
            sidebarElementId: 'settings-about',
            iconClass: 'bi-info-circle',
            sectionName: '{{ translator.translate("SETTINGS.SECTIONS.ABOUT") }}',
            url: '#about-transcendence',
            show: true,
        }, {
            sidebarElementId: 'settings-delete-account',
            iconClass: 'bi-trash',
            sectionName: '{{ translator.translate("SETTINGS.SECTIONS.DELETE_ACCOUNT") }}',
            url: '#delete-account',
            show: true,
        }];
    };

    mapSidebarSettingsLinksToDiv() {
        return this.getSidebarElements()
            .filter(({ show }) => show)
            .map( link =>
                `
                <div id="${link.sidebarElementId}" class="p-3 mb-3 d-flex align-items-center">
                    <i class='me-3 bi ${link.iconClass}'></i>
                    <span class="text-uppercase text-white option">${link.sectionName}</span>
                </div>
            `).join('');
    }

    bind() {
        this.getSidebarElements();

        this.subscribeAll('.options-settings div', 'click', e => {
            this._getDOM().querySelectorAll('.options-settings div').forEach(opt => opt.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
        });

        this.subscribe('#settings-user-management', 'click', () => {
            const userManagement = this._getDOM().querySelector('settings-user-management');
            const divToScroll = userManagement.shadowRoot.getElementById('user-management');
            divToScroll.scrollIntoView({ behavior: 'smooth' });
        });

        this.subscribe('#settings-change-password', 'click', () => {
            const changePassword = this._getDOM().querySelector('settings-change-password');
            const divToScroll = changePassword.shadowRoot.getElementById('change-password');
            divToScroll.scrollIntoView({ behavior: 'smooth' });
        });

        this.subscribe('#settings-two-factor', 'click', () => {
            const twoFactor = this._getDOM().querySelector('settings-two-factor-auth');
            const divToScroll = twoFactor.shadowRoot.getElementById('two-factor');
            divToScroll.scrollIntoView({ behavior: 'smooth' });
        });

        this.subscribe('#settings-about', 'click', () => {
            const about = this._getDOM().querySelector('settings-about');
            const divToScroll = about.shadowRoot.getElementById('about');
            divToScroll.scrollIntoView({ behavior: 'smooth' });
        });

        this.subscribe('#settings-delete-account', 'click', () => {
            const deleteAccount = this._getDOM().querySelector('settings-delete-account');
            const divToScroll = deleteAccount.shadowRoot.getElementById('delete-account');
            divToScroll.scrollIntoView({ behavior: 'smooth' });
        });
    }

    render() {
        return `
            <div class="w-100 h-100 settings-container">
                <aside class="d-flex flex-column justify-content-center settings-sidebar position-sticky sticky p-3 rounded">
                    <div class="options-settings">
                        ${ this.mapSidebarSettingsLinksToDiv() }
                    </div>
                </aside>
                <div class="d-flex flex-column settings-content">
                    <settings-user-management sectionId="user-management"></settings-user-management>
                    <settings-change-password sectionId="change-password"></settings-change-password>
                    ${!this.state.user?.is42 ? '<settings-two-factor-auth sectionId="two-factor"></settings-two-factor-auth>': ''}
                    <settings-about sectionId="about"></settings-about>
                    <settings-delete-account sectionId="delete-account"></settings-delete-account>
                </div>
            </div>
        `;
    }
});