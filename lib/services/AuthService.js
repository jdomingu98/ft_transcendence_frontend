import FetchService from './FetchService';

class AuthService {

    static AUTH_BASE_URL = '/api/v1/user';

    static async register(data) {
        return FetchService.post(`${this.AUTH_BASE_URL}/`, data);
    }

    static async login(data) {
        return FetchService.post(`${this.AUTH_BASE_URL}/login/`, data);
    }

    static async forgotPassword(data) {
        return FetchService.post(`${this.AUTH_BASE_URL}/pass-reset/`, data);
    }

    static async changeRequestPassword(data) {
        return FetchService.post(`${this.AUTH_BASE_URL}/change-password/`, data);
    }

    static async changePassword(data) {
        return FetchService.withAuth.post(`${this.AUTH_BASE_URL}/change-password/`, data);
    }

    static async oAuthLogin(code) {
        return FetchService.post(`${this.AUTH_BASE_URL}/oauth/`, { code });
    }

    static async verifyOTP(data) {
        return FetchService.post(`${this.AUTH_BASE_URL}/otp/`, data);
    }

    static async logout(data) {
        return FetchService.withAuth.post(`${this.AUTH_BASE_URL}/logout/`, data);
    }
}

export default AuthService;
