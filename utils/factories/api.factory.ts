import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from './http-instance.factory';
import {
    APIResponse,
    APIResponseCollection,
    GetStrapiType,
    StrapiModelUID,
} from '../../types/strapi/types';

type ApiTypes = {
    single: unknown;
    many: unknown;
    create: unknown;
    update: unknown;
};

export type ApiCustomTypes<
    DefaultTypes extends ApiTypes,
    CustomType extends Partial<ApiTypes> = {},
> = {
    [K in keyof ApiTypes]: K extends keyof CustomType ? CustomType[K] : DefaultTypes[K];
};

export type ApiBaseTypes<BaseType extends object> = ApiCustomTypes<{
    single: BaseType;
    many: BaseType[];
    create: Omit<BaseType, 'id'>;
    update: Partial<Omit<BaseType, 'id'>>;
}>;

export type ApiStrapiTypes<TSchemaUID extends StrapiModelUID> = ApiCustomTypes<{
    single: APIResponse<TSchemaUID>;
    many: APIResponseCollection<TSchemaUID>;
    create: Omit<GetStrapiType<TSchemaUID>, 'id'>;
    update: Partial<Omit<GetStrapiType<TSchemaUID>, 'id'>>;
}>;

export abstract class ApiInstance<Types extends ApiTypes> {
    protected httpInstance: AxiosInstance;
    protected endpoint: string;

    protected constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.httpInstance = HttpInstanceFactory.getInstance();
    }

    public async findOne(id: string | number): Promise<Types['single']> {
        const res = await this.httpInstance.get<Types['single']>(`${this.endpoint}/${id}`);
        return res.data;
    }

    public async findMany(): Promise<Types['many']> {
        const res = await this.httpInstance.get<Types['many']>(this.endpoint);
        return res.data;
    }

    public async create(data: Types['create']): Promise<Types['single']> {
        const res = await this.httpInstance.post<Types['single']>(this.endpoint, data);
        return res.data;
    }

    public async update(id: string | number, data: Types['update']): Promise<Types['single']> {
        const res = await this.httpInstance.put<Types['single']>(`${this.endpoint}/${id}`, data);
        return res.data;
    }

    public async delete(id: string | number): Promise<Types['single']> {
        const res = await this.httpInstance.put<Types['single']>(`${this.endpoint}/${id}`);
        return res.data;
    }
}

export const getApi = <Types extends ApiTypes, ExtendedApi = ApiInstance<Types>>(
    endpoint: string,
) => {
    return class Api extends ApiInstance<Types> {
        private static instance: ExtendedApi | null = null;

        public static getInstance(): ExtendedApi {
            if (!this.instance) {
                this.instance = new this(endpoint) as ExtendedApi;
            }
            return this.instance;
        }
    };
};
