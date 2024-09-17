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
                        <modal-h1-text uppercase="true">Transcendence</modal-h1-text>
                        <modal-h1-text color="var(--app-secondary-color)" className="mb-5">Change password</modal-h1-text>
                        <form class="d-flex flex-column mt-5">
                            <div class="form-group">
                                <label for="new-password">New Password</label>
                                <input type="password" id="new-password" name="new-password">
                            </div>
                            <div class="form-group mb-4" style="margin-top:5.5rem;">
                                <label for="repeat-password">Password Confirmation</label>
                                <input type="password" id="repeat-password" name="repeat-password">
                            </div>
                            <primary-button color="#8D8DDA" w="330px" h="68px" className="mb-5 mt-4">Confirm</primary-button>
                        </form>
                    </div>
                </div>
            </section>
        `;
    }
});
