import { APIResponse, APIResponseCollection, GetStrapiType } from './strapi/types';

export type User = GetStrapiType<'plugin::users-permissions.user'>;
export type UserCreate = Pick<Partial<User>, 'email' | 'password'>;
export type UserApi = APIResponse<User>;
export type UsersApi = APIResponseCollection<User>;
