import { APIResponse, APIResponseCollection, GetValues, ReassignKey } from './strapi/types';
import { User } from './users';

export type TMyCar = {
    id: number;
    model: string;
    year: number;
};

export type TMyCarCreate = Pick<TMyCar, 'model' | 'id'>;
export type TMyCarUpdate = Partial<TMyCarCreate>;

export type CarStrapi = GetValues<'api::car.car'>;
export type CarReassignedUser = ReassignKey<CarStrapi, 'user', User>;
export interface Car extends CarReassignedUser {}
export type CarApi = APIResponse<Car>;
export type CarsApi = APIResponseCollection<Car>;
