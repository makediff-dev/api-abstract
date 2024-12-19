import { ApiCustomTypes, getApi } from '../utils/factories/api.factory';
import { User } from '../types/users';

//
// Базовое использование API
//
class UsersApi extends getApi<User>('users') {}

//
// Расширение API
//
class UsersExtendedApi extends getApi<User, UsersExtendedApi>('users') {
    sum(a: number, b: number) {
        return a + b;
    }
}

//
// Переназначение базовых типов API
//
type UsersApiCustomTypes = ApiCustomTypes<
    User,
    {
        create: {
            abc: string;
        };
        single: {
            username: string;
        };
    }
>;
class UsersRetypizedApi extends getApi<User, UsersRetypizedApi, UsersApiCustomTypes>('users') {}

//
// Тесты
//
const api = UsersApi.getInstance();
const apiExtended = UsersExtendedApi.getInstance();
const apiRetypized = UsersRetypizedApi.getInstance();

api.findMany();

// В расширенном API мы получили доступ к указанным методам
apiExtended.sum(1, 2);

// Теперь create принимает в body обновленный тип
apiRetypized.create({
    abc: '',
});
// И findOne возвращает { username: string }
apiRetypized.findOne(1);
// Но findMany возвращает стандартных юзеров, так как не был кастомизирован
apiRetypized.findMany();
