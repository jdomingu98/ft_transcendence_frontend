import WebComponent, { Component, Router } from '#WebComponent';

import css from './MainSidebar.css?inline';

const id = 2;

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
                sectionName: 'TOUR,NAMENTS',
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
            }, {
                sidebarElementId: 'history',
                iconClasses: 'bi bi-clock-history',
                sectionName: 'HISTORY',
                url: 'history'
            }, {
                sidebarElementId: 'settings',
                iconClasses: 'bi bi-gear',
                sectionName: 'SETTINGS',
                url: 'settings'
            }, {
                sidebarElementId: 'logout',
                iconClasses: 'bi bi-box-arrow-left',
                sectionName: 'LOG OUT',
                url: ''
            }]
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
            const option = this.state.sidebarLinks.find(({ sidebarElementId }) => sidebarElementId === currentTarget.id)
            
            let route = `/app/${option.sidebarElementId}`;
            
            if (option.sidebarElementId === 'logout') {
                // TODO: Delete session token
                route = '/';
            }
            Router.push(route);
        })

        this.subscribe('#profile', 'click', () => Router.push(`/app/profile/${id}`));
    }

    render() {
        return `
            <aside id="aside" class="sidebar">
                <div class="head">
                    <div id="profile" class="profile">
                        <img src="https://placehold.co/50/png">
                        <p>TRANSCENDENCE</p>
                    </div>
                    <i id="menu" class='bi bi-list'></i>
                </div>
                <div id="options" class="options">
                    ${ this.mapSidebarLinksToDiv() }
                </div>
            </aside>
            <div id="content" class="content">
                <app-router [routes]="[
                    {path: '/profile/:id', component: 'profile-page'},
                    {path: '/game', component: 'game-page'},
                    {path: '/tournament', component: 'tournament-page'},
                    {path: '/chat', component: 'chat-page'},
                    {path: '/ranking', component: 'ranking-page'},
                    {path: '/history', component: 'history-page'},
                    {path: '/settings', component: 'settings-page'},
                ]">
                </app-router>
            </div>
        `;
    }
})