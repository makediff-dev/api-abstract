import { APIResponse, APIResponseCollection, GetStrapiType, StrapiModelUID } from './strapi/types';

const userModelUID: StrapiModelUID = 'plugin::users-permissions.user';
type UserModelUID = typeof userModelUID;
export type User = GetStrapiType<UserModelUID>;
export type UserCreate = Pick<Partial<User>, 'email'>;
export type UserApi = APIResponse<UserModelUID>;
export type UsersApi = APIResponseCollection<UserModelUID>;
