import WebComponent, { Component } from '#WebComponent';

import css from './ResetPassword.css?inline';

export default Component ({
    tagName: 'reset-password',
    styleCSS: css
},

class ResetPassword extends WebComponent {
    render() {
        return `
            <section class="container-fluid parent">
                <div class="col card d-flex text-center">
                    <div class="card-body d-flex flex-column justify-content-center align-items-center mb-4">
                        <h1 class="fw-bold my-3 text-white text-uppercase">Transcendence</h1>
                        <h2 class="fw-bold mb-5" style="color: var(--app-secondary-color);">Change password</h2>
                        <form class="d-flex flex-column mt-4">
                            <div class="form-group">
                                <label for="new-password">New Password</label>
                                <input type="password" id="new-password" name="new-password">
                            </div>
                            <div class="form-group mb-3" style="margin-top:5rem;">
                                <label for="repeat-password">Password Confirmation</label>
                                <input type="password" id="repeat-password" name="repeat-password">
                            </div>
                            <primary-button color="#8D8DDA" w="359px" h="70px" bootstrap="my-4">Confirm</primary-button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
});
