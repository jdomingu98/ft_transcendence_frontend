import '/src/bootstrap.scss';
import './pages';
import '#WebComponent/components';
import '#common';

import WebComponent, { Component } from '#WebComponent';
import { LANGUAGES } from './const';
import Translator from '#WebComponent/modules/translator';

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css?inline';
import bootstrapIcons from 'bootstrap-icons/font/bootstrap-icons.min.css?inline';

import style from './styles.css?inline';

WebComponent.defineGlobalCSS([style, bootstrap, bootstrapIcons]);

Translator.init({ fileList: LANGUAGES });

export default Component ({
    tagName: 'app-root',
},
class AppRoot extends WebComponent {
    render() {
        return `
            <snackbar-container></snackbar-container>
            <app-router
                [routes]="[
                    { path: '/', component: 'landing-page' },
                    { path: '/privacy-policy', component: 'privacy-policy' },
                    { path: '/legal-notice', component: 'legal-notice' },
                    { path: '/terms-conditions', component: 'terms-conditions' },
                    { path: '/app', component: 'main-sidebar'},
                    { path: '/reset-password', component: 'reset-password' },
                    { path: '/redirect', component: 'oauth-redirect' },
                    { path: '/game', component: 'game-page' },
                    { path: '/tournament', component: 'game-page' },
                    { path: '/error', component: 'error-page' },
                ]">
            </app-router>
        `;
    }
});