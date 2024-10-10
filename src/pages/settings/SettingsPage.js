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
                sectionName: '{{ translator.translate("SETTINGS.SECTIONS.TWO_FACTOR_AUTH") }}',
                url: '#two-factor'
            }, {
                sidebarElementId: 'settings-visibility',
                iconClass: 'bi-file-lock',
                sectionName: '{{ translator.translate("SETTINGS.SECTIONS.CHANGE_VISIBILITY") }}',
                url: '#visibility'
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
            console.log(e.currentTarget);
            e.currentTarget.classList.add('selected');
        });

        this.subscribe('#settings-user-management', 'click', () => {
            const userManagement = this._getDOM().querySelector('settings-user-management');
            const divToScroll = userManagement.shadowRoot.getElementById('user-management');
            divToScroll.scrollIntoView({ behavior: 'smooth' });
        });
    }

    render() {
        return `
            <div class="w-100 h-100 d-flex">
                <aside class="position-relative col-md-4 d-flex justify-content-center gap-5">
                    <div class="options-settings position-fixed top-50 d-flex row justify-content-start rounded p-3 settings-sidebar">
                        ${ this.mapSidebarSettingsLinksToDiv() }
                    </div>
                </aside>
                <div class="d-flex col justify-content-center align-items-center">
                    <div class="d-flex row">
                        <settings-user-management id="user-management"></settings-user-management>
                        <!--<settings-change-password></settings-change-password>
                        <settings-two-factor></settings-two-factor>
                        <settings-visibility></settings-visibility>
                        <settings-about></settings-about>
                        <settings-delete-account></settings-delete-account> -->
                    </div>
                </div>
            </div>
        `;
    }
});