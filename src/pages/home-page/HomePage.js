import WebComponent, { Component } from "#WebComponent"
import css from './HomePage.css?inline'

export default Component({
  // tagName: 'login-page',
  styleCSS: css
},
class HomePage extends WebComponent {
  render() {
    return `
    <div>
      <div class="si">Homepage works!</div>
    </div>
    `
  }
})
