class FetchService {
    static async get(url, options = {}) {
        return fetch(url, options)
            .then(response => response.json());
    }

    static async post(url, data, options = {}) {
        return fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            ...options
        })
            .then(response => response.json());
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
            .then(response => response.json());
    }

    static async delete(url, options = {}) {
        return fetch(url, {
            method: 'DELETE',
            ...options
        })
            .then(response => response.json());
    }
}

export default FetchService;