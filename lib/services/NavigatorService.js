import Router from '../WebComponent/Router';

class NavigatorService {
    static goToHomePage() {
        Router.push('/');
    }

    static goToHome() {
        Router.push('/app');
    }

    static goTo404Page() {
        Router.push('/404');
    }

    static goToErrorPage(message) {
        Router.push('/error', { message });
    }
}

export default NavigatorService;