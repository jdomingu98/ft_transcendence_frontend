import WebComponent, { Component } from '#WebComponent';
import AuthService from '#services/AuthService.js';

import css from '../landing-auth-modal.css?inline';

export default Component ({
    tagName: 'login-form',
    styleCSS: css,
},
class LoginForm extends WebComponent {

    doLogin() {
        const username = this._getDOM().querySelector('#sigin-username').value;
        const password = this._getDOM().querySelector('#signin-password').value;

        if (!username || !password) {
            this._getDOM().querySelector('.input-field h4').classList.add('error');
            this._getDOM().querySelector('.input-field p').textContent = 'Please fill in all fields';
            return;
        }

        AuthService.login({username, password}).then(response => {
            // Mirar si tiene otp
                //Si tiene otp, mostrar formulario de otp y cerrar login
            //Setter acces y refresh tokens en localsotrage
            //Snackbar
            //Redirigir a la pagina de app/me
        }).catch(error => {
            //mensaje de error en campo x
        })
    }

    bind() {
        this.subscribe('.primary-btn', 'click', () => this.doLogin());

        this.subscribe('.signupBtn', 'click', e => {
            e.preventDefault();
            this.emit('ON_SIGNUP_CLICK');
        });

        this.subscribe('.forgotBtn', 'click', e => {
            e.preventDefault();
            this.emit('LOGIN_TO_FORGOT_CLICK');
        });

        this.subscribe('.closeModalBtn', 'click', () => this.emit('CLOSE_MODAL'));

        this.subscribe('.togglePassword', 'click', e => {
            const input = e.target.closest('.password-container').querySelector('input');
            const icon = e.target.closest('.togglePassword').querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            }
        });
    }

    render() {
        return `
            <div class="form signinform" part="signinform">
                <div class="icons-toolbar" style="flex-direction: row-reverse;">
                    <i class='closeModalBtn bi bi-x' ></i>
                </div>
                <form>
                    <h2>TRANSCENDENCE</h2>
                    <h3>Sign In</h3>
                    <div class="input-field">
                        <h4>Username</h4>
                        <input type="text" id="sigin-username" placeholder="JohnDoe" required>
                        <p class="error-message">Error message here</p>
                    </div>
                    <div class="input-field">
                        <h4>Password</h4>
                        <div class="password-container">
                            <input type="password" id="signin-password" placeholder="Your password" required>
                            <span class="togglePassword">
                                <i class='bi bi-eye'></i>
                            </span>
                        </div>
                        <p class="error-message">Error message here</p>
                    </div>
                    <p class="forgotBtn forgot" style="padding: 10px; cursor:pointer; width:fit-content">Forgot Password?</p>
                    <div class="signButtons">
                        <input type="submit" class="primary-btn" style="margin-right: 10px;" value="Log In Now">
                        <button class="signupBtn secondary-btn">Register</button>
                    </div>
                    <p class="forgot text-center mt-3">- OR LOGIN WITH -</p>
                    <button class="primary-btn-alt">42 account</button>
                </form>
            </div>
            `;
    }
}
);