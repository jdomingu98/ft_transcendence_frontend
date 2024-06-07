import WebComponent, { Component } from "#WebComponent"
import css from './LoginPage.css?inline'

export default Component({
  tagName: 'login-page',
  styleCSS: css
},
class LoginPage extends WebComponent {
  render() {
    return `
    <div>
        <div class="si">Login works!</div>
    </div>
    `
  }
})
