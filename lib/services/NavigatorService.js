import Router from '../WebComponent/Router';

class NavigatorService {
    static goToLandingPage() {
        Router.push('/');
    }

    static goToHome() {
        Router.push('/app/me');
    }

    static goToErrorPage(message) {
        Router.push('/error', { message });
    }
}

export default NavigatorService;