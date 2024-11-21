import FetchService from './FetchService';

class FriendService {
    static FRIEND_URL = '/api/v1/user/friends';


    static async getFriendRequests(userId) {
        return FetchService.withAuth.get(`${FriendService.FRIEND_URL}/requests/`, { user_id: userId });
    }

    static async requestFriendship(friendId) {
        return FetchService.withAuth.post(`${FriendService.FRIEND_URL}/`, { friend_id: friendId });
    }

    static async deleteFriendship(friendId) {
        return FetchService.withAuth.delete(`${FriendService.FRIEND_URL}/${friendId}/`);
    }

    static async acceptFriendship(friendId) {
        return FetchService.withAuth.post(`${FriendService.FRIEND_URL}/accept/`, { friend_id: friendId });
    }

    static async cancelFriendshipRequest(friendId) {
        return FetchService.withAuth.post(`${FriendService.FRIEND_URL}/cancel/`, { friend_id: friendId });
    }

}

export default FriendService;