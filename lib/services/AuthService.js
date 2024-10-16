import FetchService from './FetchService';

class AuthService {

    static async register(data) {
        return FetchService.post('/api/v1/user/', data);
    }

    static async login(data) {
        return FetchService.post('/api/v1/user/login/', data);
    }

    static async forgotPassword(data) {
        return FetchService.post('/api/v1/user/pass-reset/', data);
    }

    static async oAuthLogin(code) {
        return FetchService.post('/api/v1/user/oauth/', { code });
    }

    static async verifyOTP(data) {
        return FetchService.post('/api/v1/user/otp/', data);
    }
}

export default AuthService;
