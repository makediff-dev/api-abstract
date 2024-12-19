import { Car } from './cars';
import { APIResponse, APIResponseCollection, GetValues, ReassignKey } from './strapi/types';

export type TMyUser = {
    id: number;
    name: string;
    email: string;
};

export type TMyUserCreate = Pick<TMyUser, 'name' | 'email'>;
export type TMyUserUpdate = Partial<TMyUserCreate>;

export type UserStrapi = GetValues<'plugin::users-permissions.user'>;
export type UserReassignedCar = ReassignKey<UserStrapi, 'car', Car>;
export interface User extends UserReassignedCar {}
export type UserUpdate = Pick<Partial<User>, 'email'>;
export type UserCreate = Pick<Partial<User>, 'email' | 'password'>;
export type UserApi = APIResponse<User>;
export type UsersApi = APIResponseCollection<User>;
