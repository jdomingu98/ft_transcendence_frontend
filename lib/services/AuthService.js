import FetchService from './FetchService';

class AuthService {
    static async oAuthLogin(code) {
        return FetchService.post('/api/v1/user/oauth/', { code });
    }

    static async register(data) {
        return FetchService.post('/api/v1/user/register/', data);
    }

    static async login(data) {
        return FetchService.post('/api/v1/user/login/', data);
    }

    static async forgotPassword(data) {
        return FetchService.post('/api/v1/user/pass-reset/', data);
    }
}

export default AuthService;
