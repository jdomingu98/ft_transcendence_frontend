import WebComponent, { Component } from "../../../lib/WebComponent/index.js"
import css from './HomePage.css?inline'

export default Component({
// tagName: 'login-page',
styleCSS: css
},
class HomePage extends WebComponent {
  render() {
    return `
    <div>
      <div class="si bg-warning">Homepage works!</div>
    </div>
    `
  }
})
