import FetchService from './FetchService';

class UserService {

    static async getMyInfo() {
        return new Promise((resolve, reject) =>
            localStorage.getItem('user') ?
                resolve(localStorage.getItem('user')) :
                FetchService.get('/api/v1/user/me/').then(resolve).catch(reject));
    }

    static async patch(data) {
        return FetchService.patch(`/api/v1/user/${data.id}/`, data).then(() => localStorage.removeItem('user'));
    }

    static async delete(id) {
        return FetchService.delete(`/api/v1/user/${id}/`).then(() => localStorage.removeItem('user'));
    }
}

export default UserService;
