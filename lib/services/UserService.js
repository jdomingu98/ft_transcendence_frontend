import FetchService from './FetchService';
import Translator from '#WebComponent/modules/translator';

class UserService {

    static async getMyInfo() {
        return new Promise((resolve, reject) =>
            localStorage.getItem('user')
                ? resolve(JSON.parse(localStorage.getItem('user')))
                : FetchService.withAuth.post('/api/v1/user/me/')
                    .then(user => {
                        localStorage.setItem('user', JSON.stringify(user));
                        Translator.getInstance().setLanguage(user.language);
                        resolve(user);
                    }).catch(reject));
    }

    static async getUsers(filters) {
        const queryParams = UserService.objectToQueryParams(filters);
        return FetchService.withAuth.get(`/api/v1/user/?${queryParams}`, { params: filters });
    }

    static async getById(id) {
        return FetchService.withAuth.get(`/api/v1/user/${id}/`);
    }

    static async getLeaderBoard() {
        return FetchService.withAuth.get('/api/v1/user/leaderboard/');
    }

    static async patch(id, data) {
        return FetchService.withAuth.patch(`/api/v1/user/${id}/`, data).then(() => localStorage.removeItem('user'));
    }

    static async delete(id) {
        return FetchService.withAuth.delete(`/api/v1/user/${id}/`).then(() => localStorage.removeItem('user'));
    }

    static objectToQueryParams(obj) {
        return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
    }
}

export default UserService;
