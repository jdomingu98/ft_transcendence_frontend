import FetchService from './FetchService';

class GameService {
    static async saveMatch(data){
        return FetchService.post('/api/v1/game/', data);
    }

    static async getMatchHistory(userId, page=1) {
        return FetchService.withAuth.get(`/api/v1/user/${userId}/match/?page=${page}`);
    }
}

export default GameService;