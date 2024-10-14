import Router from '../WebComponent/Router';

class NavigatorService {
    static goToLandingPage() {
        Router.push('/');
    }

    static goTo42LoginPage() {
        Router.push(import.meta.env.VITE_FT_API_URL);
    }

    static goToHome() {
        Router.push('/app/me');
    }

    static goToErrorPage(message) {
        Router.push('/error', { message });
    }
}

export default NavigatorService;