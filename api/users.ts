import { getApi } from '../utils/factories/api.factory';
import { User } from '../types/users';

class UsersApi extends getApi<User, UsersApi>('users') {
    logEndpoint() {}
}

const api = UsersApi.getInstance();

api.findMany();
api.logEndpoint();
