import FetchService from './FetchService';

class FriendService {
    static FRIEND_URL = '/api/v1/user/friends';

    static async requestFriendship(friendId){
        return FetchService.withAuth.post(`${this.FRIEND_URL}/`, { friend_id: friendId });
    }

    static async deleteFriendship(friendId){
        return FetchService.withAuth.delete(`${this.FRIEND_URL}/${friendId}/`);
    }

    static async cancelFriendshipRequest(friendId){
        return FetchService.withAuth.post(`${this.FRIEND_URL}/cancel/`, { friend_id: friendId });
    }

    static async acceptFriendship(friendId){
        return FetchService.withAuth.post(`${this.FRIEND_URL}/accept/`, { friend_id: friendId });
    }
}

export default FriendService;