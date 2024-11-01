import FetchService from './FetchService';

class UserService {

    static async delete(id) {
        return FetchService.delete(`/api/v1/user/${id}/`);
    }
}

export default UserService;
