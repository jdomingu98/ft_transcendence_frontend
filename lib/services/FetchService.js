import { Router } from '#WebComponent';

class FetchService {

    static async get(url, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : undefined,
            },
            ...options
        })
            .then(FetchService.genericCallback(() => FetchService.get(url, options)));
    }

    static async post(url, data, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : undefined,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchService.genericCallback(() => FetchService.post(url, data, options)));
    }

    static async put(url, data, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : undefined,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchService.genericCallback(() => FetchService.put(url, data, options)));
    }

    static async patch(url, data, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : undefined,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchService.genericCallback(() => FetchService.patch(url, data, options)));
    }

    static async delete(url, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : undefined,
            },
            ...options
        })
            .then(FetchService.genericCallback(() => FetchService.delete(url, options)));
    }

    static async refreshToken() {
        return FetchService.post('/api/v1/user/refresh/', {
            token: localStorage.getItem('refresh_token')
        })
            .then(response => {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                return response;
            }).catch(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                Router.push('/');
                return Promise.reject();
            });
    }

    static genericCallback(method) {
        return response => new Promise((resolve, reject) => {
            if(response.status === 204)
                return resolve();
            if (response.status === 401) {
                return FetchService.refreshToken()
                    .then(() => method())
                    .then(resolve)
                    .catch(() => reject(undefined));
            }
            return response.json().then(response.ok ? resolve : reject);
        });
    };
}

export default FetchService;