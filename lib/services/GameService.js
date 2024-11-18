import FetchService from './FetchService';

class GameService {

    static GAME_BASE_URL = '/api/v1/game';

    static async createTournament(data){
        return FetchService.post(`${this.GAME_BASE_URL}/tournament/`, data);
    }

    static async checkPlayersData(data) {
        return FetchService.get(`${this.GAME_BASE_URL}/validate_match/`, data);
    }

    static async getTournamentInfo(id) {
        return FetchService.get(`${this.GAME_BASE_URL}/tournament/${id}/`);
    }

    static async storeMatch(data){
        return FetchService.post(`${this.GAME_BASE_URL}/`, data);
    }

    static async getMatchHistory(userId, page=1) {
        return FetchService.withAuth.get(`/api/v1/user/${userId}/match/?page=${page}`);
    }
}

export default GameService;