import { APIResponse, APIResponseCollection, GetStrapiType, StrapiModelUID } from './strapi/types';

const carSchemaUID: StrapiModelUID = 'api::car.car';
type CarSchemaUID = typeof carSchemaUID;
export type Car = GetStrapiType<CarSchemaUID>;
export type CarApi = APIResponse<CarSchemaUID>;
export type CarsApi = APIResponseCollection<CarSchemaUID>;
