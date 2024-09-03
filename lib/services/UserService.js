export class UserService {
    static async register(username, email, password, passwordConfirmation) {
        return fetch('/api/v1/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                repeat_password: passwordConfirmation
            })
        })
        .then(response => new Promise((resolve, reject) => {
            response.json().then(response.ok ? resolve : reject)
        }))
    }
}