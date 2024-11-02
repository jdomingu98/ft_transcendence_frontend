import FetchService from './FetchService';

class UserService {

    static async patch(data) {
        return FetchService.patch(`/api/v1/user/${data.id}/`, data);
    }

    static async delete(id) {
        return FetchService.delete(`/api/v1/user/${id}/`);
    }
}

export default UserService;
