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

    static searchUser(username) {
        Router.push(`/app/search?username=${username}`);
    }

    static goToErrorPage(message) {
        Router.push('/error', { message });
    }

    static goToGame() {
        Router.push('/game');
    }

    static goToTournament() {
        Router.push('/tournament');
    }
}

export default NavigatorService;