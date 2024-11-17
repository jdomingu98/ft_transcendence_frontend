import FetchService from './FetchService';

class GameService {

    static GAME_BASE_URL = '/api/v1/game';

    static async createTournament(data){
        return FetchService.withAuth.post(`${this.GAME_BASE_URL}/tournament`, data);
    }

    static async checkPlayersData(data) {
        return FetchService.get(`${this.GAME_BASE_URL}/check-players`, data); //TODO
    }

    static async getTournamentInfo(id) {
        return FetchService.get(`${this.GAME_BASE_URL}/tournament/${id}`);
    }

    static async saveMatch(data){
        return FetchService.post(`${this.GAME_BASE_URL}/`, data);
    }
}

export default GameService;