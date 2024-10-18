import Router from '../WebComponent/Router';

class NavigatorService {
    static goToLandingPage() {
        Router.push('/');
    }

    static goTo42LoginPage() {
        window.location.href = import.meta.env.VITE_FT_API_URL;
    }

    static goToHome() {
        Router.push('/app/me');
    }

    static goToProfile(id) {
        Router.push(`/app/profile/${id}`);
    }

    static goToSidebarElementPage(route) {
        Router.push(`/app/${route}`);
    }

    static goToErrorPage(message) {
        Router.push('/error', { message });
    }
}

export default NavigatorService;