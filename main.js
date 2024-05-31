import { Router } from './WebComponent/index.js'
import './src/pages'

const routes = [
  { path: '/', component: 'login-page' },
]

Router.initRouter(routes)