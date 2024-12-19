import { APIResponse, APIResponseCollection, GetStrapiType } from './strapi/types';

export type Car = GetStrapiType<'api::car.car'>;
export type CarApi = APIResponse<Car>;
export type CarsApi = APIResponseCollection<Car>;
