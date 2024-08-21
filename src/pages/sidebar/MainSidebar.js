import WebComponent, { Component, Router } from '#WebComponent';

//import { DEFAULT_SIDEBAR_PROFILE_IMG } from '/src/const/index.js';

import css from './MainSidebar.css?inline';

const id = 2;
const profilePicture = '/src/resources/devs/jdomingu.png';

export default Component ({
    tagName: 'main-sidebar',
    styleCSS: css
},

class MainSidebar extends WebComponent {

    init() {
        this.state = {
            sidebarLinks: [{
                sidebarElementId: 'game',
                iconClasses: 'bi bi-joystick',
                sectionName: 'PLAY A GAME',
                url: 'game'
            }, {
                sidebarElementId: 'tournament',
                iconClasses: 'bi bi-trophy',
                sectionName: 'TOURNAMENTS',
                url: 'tournament'
            }, {
                sidebarElementId: 'chat',
                iconClasses: 'bi bi-chat-square',
                sectionName: 'CHATS',
                url: 'chat'
            }, {
                sidebarElementId: 'rank',
                iconClasses: 'bi bi-graph-up-arrow',
                sectionName: 'RANKING',
                url: 'ranking'
            }, /*{
                sidebarElementId: 'history',
                iconClasses: 'bi bi-clock-history',
                sectionName: 'HISTORY',
                url: 'history'
            },*/ {
                sidebarElementId: 'settings',
                iconClasses: 'bi bi-gear',
                sectionName: 'SETTINGS',
                url: 'settings'
            }, {
                sidebarElementId: 'logout',
                iconClasses: 'bi bi-box-arrow-left',
                sectionName: 'LOG OUT',
                url: ''
            }],
            routes: [
                {path: '/profile/:id', component: 'profile-page'},
                {path: '/game', component: 'game-page'},
                {path: '/tournament', component: 'tournament-page'},
                {path: '/chat', component: 'chat-page'},
                {path: '/ranking', component: 'ranking-page'},
                {path: '/history', component: 'history-page'},
                {path: '/settings', component: 'settings-page'},
            ]
        };
    }

    mapSidebarLinksToDiv() {
        return this.state.sidebarLinks.map( link =>
            `
                <div id="${link.sidebarElementId}" class="menu-options">
                    <i class='${link.iconClasses}'></i>
                    <span class="option" style="pointer-events: none;">${link.sectionName}</span>
                </div>
            `).join('');
    }

    bind() {
        this.subscribe('#menu', 'click', () => this._getDOM().querySelector('#aside').classList.toggle('active'));

        this.subscribeAll('.options div', 'click', e => {
            this._getDOM().querySelectorAll('.options div')
                .forEach(opt => {
                    opt.classList.remove('active');

                });
            e.currentTarget.classList.add('active');
        });

        this.subscribeAll('.menu-options', 'click', ({ currentTarget }) => {
            const option = this.state.sidebarLinks.find(({ sidebarElementId }) => sidebarElementId === currentTarget.id);

            let route = `/app/${option.sidebarElementId}`;

            if (option.sidebarElementId === 'logout') {
                // sessionStorage.removeItem('token');
                route = '/';
            }
            Router.push(route);
        });

        this.subscribe('#profile', 'click', () => Router.push(`/app/profile/${id}`));
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