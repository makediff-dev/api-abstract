import { ApiCustomTypes, ApiStrapiTypes, getApi } from '../utils/factories/api.factory';
import { UserCreate } from '../types/users';

//
// Базовое использование API
//
class UsersApi extends getApi<ApiStrapiTypes<'plugin::users-permissions.user'>>('users') {}

//
// Расширение API
//
class UsersExtendedApi extends getApi<
    ApiStrapiTypes<'plugin::users-permissions.user'>,
    UsersExtendedApi
>('users') {
    sum(a: number, b: number) {
        return a + b;
    }
}

//
// Переназначение базовых типов API
//
type UsersApiCustomTypes = ApiCustomTypes<
    ApiStrapiTypes<'plugin::users-permissions.user'>,
    {
        create: UserCreate;
        single: {
            username: string;
        };
    }
>;
class UsersRetypizedApi extends getApi<UsersApiCustomTypes>('users') {}

//
// Тесты
//
const api = UsersApi.getInstance();
const apiExtended = UsersExtendedApi.getInstance();
const apiRetypized = UsersRetypizedApi.getInstance();

api.findMany();
api.findOne(1);

// В расширенном API мы получили доступ к указанным методам
apiExtended.sum(1, 2);

// Теперь create принимает в body обновленный тип
apiRetypized.create({
    email: '',
});
// И findOne возвращает { username: string }
apiRetypized.findOne(1);
// Но findMany возвращает стандартных юзеров, так как не был кастомизирован
apiRetypized.findMany();
