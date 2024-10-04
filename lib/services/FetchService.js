class FetchService {
    static async get(url, options = {}) {
        return fetch(url, options)
            .then(response => new Promise((resolve, reject) => response.json()
                .then(response.ok ? resolve : reject)
            ));
    }

    static async post(url, data, options = {}) {
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(response => new Promise((resolve, reject) => response.json()
                .then(response.ok ? resolve : reject)
            ));
    }

    static async put(url, data, options = {}) {
        return fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(response => new Promise((resolve, reject) => response.json()
                .then(response.ok ? resolve : reject)
            ));
    }

    static async delete(url, options = {}) {
        return fetch(url, {
            method: 'DELETE',
            ...options
        })
            .then(response => new Promise((resolve, reject) => response.json()
                .then(response.ok ? resolve : reject)
            ));
    }
}

export default FetchService;