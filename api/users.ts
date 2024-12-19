import { ApiInstance, getBaseApi, getExtendedApi } from '../utils/factories/api.factory';
import { UserApi, UserCreate, UserUpdate } from '../types/users';

interface IUsersApi extends ApiInstance<UserApi, UsersApi, UserCreate, UserUpdate> {
    logEndpoint: () => void;
}

class UsersApi extends getBaseApi<UserApi, UsersApi, UserCreate, UserUpdate>('users') {}
class UsersApiExtended
    extends getExtendedApi<UserApi, UsersApi, UserCreate, UserUpdate, IUsersApi>('users')
    implements IUsersApi
{
    logEndpoint() {
        return;
    }
}

UsersApi.getInstance().findMany();
UsersApiExtended.getInstance().logEndpoint();
