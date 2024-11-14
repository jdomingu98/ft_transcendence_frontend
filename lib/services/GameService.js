import FetchService from './FetchService';

const GAME_BASE_URL = '/api/v1/game';

class GameService {

    static async createTournament(data){
        return FetchService.post(`${GAME_BASE_URL}/tournament`, data);
    }

    static async checkPlayersData(data) {
        return FetchService.post(`${GAME_BASE_URL}/tournament/check-match-players`, data); //TODO
    }

    static async saveMatch(data){
        return FetchService.post(`${GAME_BASE_URL}/`, data);
    }
}

export default GameService;