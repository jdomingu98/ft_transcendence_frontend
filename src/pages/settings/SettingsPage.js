import '/src/components/app/settings';

import WebComponent, { Component } from '#WebComponent';

import css from './SettingsPage.css?inline';

export default Component ({
    tagName: 'settings-page',
    styleCSS: css
},

class SettingsPage extends WebComponent {
    init() {
        this.state = {
            sidebarSettingsLinks: [{
                sidebarElementId: 'settings-user-management',
                iconClass: 'bi-person-circle',
                sectionName: '{{ translator.translate("SETTINGS.SECTIONS.USER_MANAGEMENT") }}',
                url: '#user-management'
            }, {
                sidebarElementId: 'settings-change-password',
                iconClass: 'bi-shield-lock',
                sectionName: '{{ translator.translate("SETTINGS.SECTIONS.CHANGE_PASSWORD") }}',
                url: '#change-password'
            }, {
                sidebarElementId: 'settings-two-factor',
                iconClass: 'bi-key',
                sectionName: `${ this.translator.translate('SETTINGS.SECTIONS.TWO_FACTOR_AUTH') }`,
                url: '#two-factor'
            }, {
                sidebarElementId: 'settings-about',
                iconClass: 'bi-info-circle',
                sectionName: '{{ translator.translate("SETTINGS.SECTIONS.ABOUT") }}',
                url: '#about-transcendence'
            }, {
                sidebarElementId: 'settings-delete-account',
                iconClass: 'bi-trash',
                sectionName: '{{ translator.translate("SETTINGS.SECTIONS.DELETE_ACCOUNT") }}',
                url: '#delete-account'
            }],
        };
    }

    mapSidebarSettingsLinksToDiv() {
        return this.state.sidebarSettingsLinks.map( link =>
            `
                <div id="${link.sidebarElementId}" class="p-3 mb-3 d-flex align-items-center">
                    <i class='me-3 bi ${link.iconClass}'></i>
                    <span class="text-uppercase text-white option">${link.sectionName}</span>
                </div>
            `).join('');
    }

    bind() {
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
            const twoFactor = this._getDOM().querySelector('settings-two-factor');
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
                <div class="d-flex flex-column justify-content-center align-items-center settings-content">
                    <settings-user-management id="user-management"></settings-user-management>
                    <settings-user-management id="user-management"></settings-user-management>
                    <settings-user-management id="user-management"></settings-user-management>
                    <!--<settings-change-password id="change-password"></settings-change-password>
                    <settings-two-factor id="two-factor"></settings-two-factor>
                    <settings-visibility id="visibility"></settings-visibility>
                    <settings-about id="about"></settings-about>
                    <settings-delete-account id="delete-account"></settings-delete-account> -->
                </div>
            </div>
        `;
    }
});