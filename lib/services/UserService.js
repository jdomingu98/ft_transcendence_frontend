import FetchService from './FetchService';

class UserService {

    static async getMyInfo() {
        return new Promise((resolve, reject) =>
            localStorage.getItem('user')
                ? resolve(JSON.parse(localStorage.getItem('user')))
                : FetchService.withAuth.post('/api/v1/user/me/')
                    .then(user => {
                        localStorage.setItem('user', JSON.stringify(user));
                        resolve(user);
                    }).catch(reject));
    }

    static async getByUsername(username) {
        return FetchService.withAuth.get(`/api/v1/user/?username=${username}`);
    }

    static async getLeaderBoard() {
        return FetchService.withAuth.get('/api/v1/user/leaderboard/');
    }

    static async patch(data) {
        return FetchService.withAuth.patch(`/api/v1/user/${data.id}/`, data).then(() => localStorage.removeItem('user'));
    }

    static async delete(id) {
        return FetchService.withAuth.delete(`/api/v1/user/${id}/`).then(() => localStorage.removeItem('user'));
    }
}

export default UserService;
