import WebComponent, { Router } from '#WebComponent'
import './pages'
import '/src/bootstrap.scss'
import style from './styles.css?inline'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css?inline'

WebComponent.defineGlobalCSS([style, bootstrap])

const routes = [
  { path: '/', component: 'login-page' },
  { path: '/home', component: 'home-page'},
  { path: '/profile/:id', component: 'profile-page'},
  { path: '/landing', component: 'landing-page'},
]

Router.initRouter(routes)