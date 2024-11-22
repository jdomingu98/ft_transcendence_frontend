import FetchService from './FetchService';

class GameService {

    static GAME_BASE_URL = '/api/v1/game';

    static async createTournament(data){
        return FetchService.post(`${this.GAME_BASE_URL}/tournament/`, data);
    }

    static async validateMatch(data) {
        return FetchService.post(`${this.GAME_BASE_URL}/validate_match/`, data);
    }

    static async getTournamentInfo(id) {
        return FetchService.get(`${this.GAME_BASE_URL}/tournament/${id}/`);
    }

    static async storeMatch(data){
        return FetchService.post(`${this.GAME_BASE_URL}/`, data);
    }
}

export default GameService;