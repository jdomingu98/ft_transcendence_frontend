import WebComponent, { Component } from "#WebComponent";
import css from './ProfilePage.css?inline'

import "/src/components/app/app-lateral-nav/app-lateral-nav.js"
import "/src/components/profile"


/* const fakeDatabase = {
  users: [
    { id: 1, name: 'Toto' },
    { id: 2, name: 'Titi' },
    { id: 3, name: 'Tata' }
  ]
}

const mockFetch = (url) => {
  return new Promise((resolve, reject) => {
    const id = url.split('/').pop()
    const user = fakeDatabase.users.find(user => user.id === parseInt(id))
    // simulate delay
    setTimeout(() => {
      if (user) {
        resolve({ json: () => user })
      } else {
        reject('User not found')
      }
    }, 2000)
  })
}

export default Component({
  tagName: 'profile-page',
  // styleCSS: css
},
class ProfilePage extends WebComponent
{
  init() {
    const { id } = this.router.params
    console.log('id', id)
    this.state = {
      user: null,
      error: null,
      loading: true
    }
    mockFetch(`/${id}`)
      .then(res => res.json())
      .then(data =>this.setState({ user: data }))
      .catch(err => this.setState({ error: "User not found" }))
      .finally(() => this.setState({ loading: false }))
  }

  render() {
    const { id } = this.router.params
    const { user, error, loading } = this.state


    return `
    <div>
      ${loading
        ? `
        <div class="spinner-grow text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        `
        :`${error
          ? `<div style="color: red">${error}</div>` 
          : `<div class="bg-primary">Profile of ${user.name} works!</div>`}`}
      
      
    </div>
    `
  }
})
 */



export default Component({
  tagName: 'profile-page',
  styleCSS: css
},
class ProfilePage extends WebComponent
{
  render() {

    return `
    <div class="container-fluid profile">
        <div class="row">
            <div class="col-2 d-flex flex-column align-items-center justify-content-start" style="background-color: #13124F;">
                <lateral-nav></lateral-nav>
            </div>
            <div class="col-10">
                <div class="container"">
                    <profile-search></profile-search>
                    <profile-card></profile-card>
                </div>
            </div>
        </div>
    </div>
    `
  }
})