import WebComponent, { Component } from '#WebComponent';

import css from './UpdatePassword.css?inline';

export default Component ({
    tagName: 'update-password',
    styleCSS: css
},

class UpdatePassword extends WebComponent {
    render() {
        return `
            <section class="container-fluid parent">
                <div class="col card d-flex text-center" style="">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center mb-4">
                        <h1 class="title fw-semibold text-uppercase text-light">Transcendence</h1>
                        <p class ="title mb-5 fw-semibold" style="color:var(--app-secondary-color); min-width: 500px;"> Change password</p>
                        <div class="form-group mt-5 mb-5">
                            <label for="new-password">New Password</label>
                            <input type="password" id="new-password" name="new-password">
                        </div>
                        <div class="form-group mt-5 mb-5">
                            <label for="repeat-password">Password Confirmation</label>
                            <input type="password" id="repeat-password" name="repeat-password">
                        </div>
                        <primary-button color="#8D8DDA" w="330px" h="68px" bootstrap="mb-5 mt-4">Confirm</primary-button>
                    </div>
                </div>
            </section>
        `;
    }
});