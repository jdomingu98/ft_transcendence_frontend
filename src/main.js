import WebComponent, { Router } from '#WebComponent';

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css?inline';
import style from './styles.css?inline';

import'/src/bootstrap.scss';
import './pages';
import '#common';


WebComponent.defineGlobalCSS([style, bootstrap]);

const routes = [
    { path: '/', component: 'landing-page' },
    { path: '/home', component: 'home-page'},
    { path: '/profile/:id', component: 'profile-page'},
    { path: '/modal', component: 'modal-1'},
];

Router.initRouter(routes);