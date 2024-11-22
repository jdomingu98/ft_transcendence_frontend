import FetchService from './FetchService';
import Translator from '#WebComponent/modules/translator';

class UserService {

    static BASE_USER_URL = '/api/v1/user';

    static async getMyInfo() {
        return new Promise((resolve, reject) =>
            localStorage.getItem('user')
                ? resolve(JSON.parse(localStorage.getItem('user')))
                : FetchService.withAuth.post(`${this.BASE_USER_URL}/me/`)
                    .then(user => {
                        localStorage.setItem('user', JSON.stringify(user));
                        Translator.getInstance().setLanguage(user.language);
                        resolve(user);
                    }).catch(reject));
    }

    static async getUsers(filters) {
        const queryParams = UserService.objectToQueryParams(filters);
        return FetchService.withAuth.get(`${this.BASE_USER_URL}/?${queryParams}`, { params: filters });
    }

    static async getById(id) {
        return FetchService.withAuth.get(`${this.BASE_USER_URL}/${id}/`);
    }

    static async getLeaderBoard() {
        return FetchService.withAuth.get(`${this.BASE_USER_URL}/leaderboard/`);
    }

    static async patch(id, data) {
        return FetchService.withAuth.patch(`${this.BASE_USER_URL}/${id}/`, data)
            .then(() => localStorage.removeItem('user'));
    }

    static async delete(id) {
        return FetchService.withAuth.delete(`${this.BASE_USER_URL}/${id}/`)
            .then(() => localStorage.removeItem('user'));
    }

    static async getMatchHistory(userId, page=1) {
        return FetchService.withAuth.get(`${this.BASE_USER_URL}/${userId}/match/?page=${page}`);
    }

    static objectToQueryParams(obj) {
        return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
    }
}

export default UserService;
