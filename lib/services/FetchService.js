import { Router } from '#WebComponent';

class FetchServiceAuth {

    static async get(url, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : '',
            },
            ...options
        })
            .then(FetchServiceAuth.genericCallback(() => FetchServiceAuth.get(url, options)));
    }

    static async post(url, data, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchServiceAuth.genericCallback(() => FetchServiceAuth.post(url, data, options)));
    }

    static async put(url, data, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchServiceAuth.genericCallback(() => FetchServiceAuth.put(url, data, options)));
    }

    static async patch(url, data, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'PATCH',
            headers: { 'Authorization': access_token ? `Bearer ${access_token}` : '' },
            body: data,
            ...options
        })
            .then(FetchServiceAuth.genericCallback(() => FetchServiceAuth.patch(url, data, options)));
    }

    static async delete(url, options = {}) {
        const access_token = localStorage.getItem('access_token');
        return fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': access_token ? `Bearer ${access_token}` : '',
            },
            ...options
        })
            .then(FetchServiceAuth.genericCallback(() => FetchServiceAuth.delete(url, options)));
    }

    static async refreshToken() {
        return FetchService.post('/api/v1/user/refresh/', {
            token: localStorage.getItem('refresh_token'),
        })
            .then(response => {
                localStorage.setItem('access_token', response.access_token);
                localStorage.setItem('refresh_token', response.refresh_token);
                return response;
            }).catch(() => {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user');
                Router.push('/');
                return Promise.reject();
            });
    }

    static genericCallback(method) {
        return response => new Promise((resolve, reject) => {
            if(response.status === 204)
                return resolve();
            if (response.status === 401) {
                return FetchServiceAuth.refreshToken()
                    .then(() => method())
                    .then(resolve)
                    .catch(() => reject(undefined));
            }
            return response.json().then(response.ok ? resolve : reject).catch(() => reject(undefined));
        });
    };
}


class FetchService {

    static withAuth = FetchServiceAuth;

    static async get(url, options = {}) {
        return fetch(url, { ...options}).then(FetchService.genericCallback());
    }

    static async post(url, data, options = {}) {
        return fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchService.genericCallback());
    }

    static async put(url, data, options = {}) {
        return fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchService.genericCallback());
    }

    static async patch(url, data, options = {}) {
        return fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            ...options
        })
            .then(FetchService.genericCallback());
    }

    static async delete(url, options = {}) {
        return fetch(url, { method: 'DELETE', ...options }).then(FetchService.genericCallback());
    }

    static genericCallback() {
        return response => new Promise((resolve, reject) => {
            if(response.status === 204)
                return resolve();
            return response.json().then(response.ok ? resolve : reject).catch(() => reject(undefined));
        });
    };
}

export default FetchService;