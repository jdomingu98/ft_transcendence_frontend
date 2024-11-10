import FetchService from './FetchService';

class GameService {
    static async saveMatch(data){
        return FetchService.post('/api/v1/game/', data);
    }
}

export default GameService;