import FetchService from './FetchService';

class AuthService {
    static async oauthLogin(code) {
        return FetchService.post('/api/v1/user/oauth', {
            code
        });
    }

    static async register(data) {
        return FetchService.post('/api/v1/user/register', data);
    }
}

export default AuthService;
