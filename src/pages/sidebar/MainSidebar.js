import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService';
import NavigatorService from '#services/NavigatorService';

//import { DEFAULT_SIDEBAR_PROFILE_IMG } from '#const';

import css from './MainSidebar.css?inline';

// const id = 2; -> id of /me profile
const profilePicture = '/src/resources/devs/jdomingu.png';

export default Component ({
    tagName: 'main-sidebar',
    styleCSS: css
},

class MainSidebar extends WebComponent {

    init() {
        this.state = {
            sidebarLinks: [{
                sidebarElementId: 'friendship-request',
                iconClasses: 'bi bi-person-add',
                sectionName: '{{ translator.translate("SIDEBAR.FRIENDSHIP_REQUEST") }}',
                url: 'friendship-request'
            }, {
                sidebarElementId: 'game',
                iconClasses: 'bi bi-joystick',
                sectionName: '{{ translator.translate("SIDEBAR.PLAY_A_GAME") }}',
                url: 'game'
            }, {
                sidebarElementId: 'tournament',
                iconClasses: 'bi bi-trophy',
                sectionName: '{{ translator.translate("SIDEBAR.TOURNAMENTS") }}',
                url: 'tournament'
            }, {
                sidebarElementId: 'rank',
                iconClasses: 'bi bi-graph-up-arrow',
                sectionName: '{{ translator.translate("SIDEBAR.RANKING") }}',
                url: 'rank'
            }, /*{
                sidebarElementId: 'history',
                iconClasses: 'bi bi-clock-history',
                sectionName: '{{ translator.translate("SIDEBAR.HISTORY") }}',
                url: 'history'
            },*/ {
                sidebarElementId: 'settings',
                iconClasses: 'bi bi-gear',
                sectionName: '{{ translator.translate("SIDEBAR.SETTINGS") }}',
                url: 'settings'
            }, {
                sidebarElementId: 'logout',
                iconClasses: 'bi bi-box-arrow-left',
                sectionName: '{{ translator.translate("SIDEBAR.LOGOUT") }}',
                url: ''
            }],
            routes: [
                {path: '/app/profile/me', component: 'profile-page'},
                {path: '/app/profile/:id', component: 'profile-page'},
                {path: '/app/search', component: 'search-results'},
                {path: '/app/game', component: 'game-page'},
                {path: '/app/tournament', component: 'tournament-page'},
                {path: '/app/friendship-request', component: 'friendship-page'},
                {path: '/app/rank', component: 'ranking-page'},
                {path: '/app/history', component: 'history-page'},
                {path: '/app/settings', component: 'settings-page'},
                {path: '/app/privacy-policy', component: 'privacy-policy'},
                {path: '/app/legal-notice', component: 'legal-notice'},
                {path: '/app/terms-conditions', component: 'terms-conditions'}
            ],
            selectedDefaultOption: window.location.pathname.split('/')[2]
        };
    }

    mapSidebarLinksToDiv() {
        return this.state.sidebarLinks.map( link =>
            `
                <div id="${link.sidebarElementId}" class="menu-options">
                    <i class='${link.iconClasses}'></i>
                    <span class="text-uppercase option">${link.sectionName}</span>
                </div>
            `).join('');
    }

    bind() {
        this.subscribe('#menu', 'click', () => this._getDOM().querySelector('#aside').classList.toggle('active'));

        this.subscribeAll('.options div', 'click', e => {
            this._getDOM().querySelectorAll('.options div').forEach(opt => opt.classList.remove('selected'));
            e.currentTarget.classList.add('selected');
        });

        this.subscribeAll('.menu-options', 'click', ({ currentTarget }) => {
            const option = this.state.sidebarLinks.find(({ sidebarElementId }) => sidebarElementId === currentTarget.id);

            if (option.sidebarElementId !== 'logout') {
                NavigatorService.goToSidebarElementPage(option.sidebarElementId);
                return;
            }

            AuthService.logout({ token: localStorage.getItem('access_token') })
                .then(() => {
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    NavigatorService.goToLandingPage();
                }).catch(e => e && NavigatorService.goToErrorPage(e.error[0]));
        });

        this.subscribe('#profile', 'click', () => NavigatorService.goToHome());
    }

    afterViewInit() {
        const defaultOption = this._getDOM().querySelector(`#${this.state.selectedDefaultOption}`);

        if (defaultOption)
            defaultOption.classList.add('selected');
    }

    render() {
        return `
            <div class="sidebar-container">
                <aside id="aside" class="sidebar">
                    <div class="head">
                        <div id="profile" class="profile">
                            <img src='${profilePicture}' class="profile-picture" alt="profile picture">
                            <p>TRANSCENDENCE</p>
                        </div>
                        <i id="menu" class='bi bi-list'></i>
                    </div>
                    <div id="options" class="options">
                        ${ this.mapSidebarLinksToDiv() }
                    </div>
                </aside>
                <div id="content" class="content">
                    <app-router [routes]="state.routes"></app-router>
                </div>
            </div>
        `;
    }
});