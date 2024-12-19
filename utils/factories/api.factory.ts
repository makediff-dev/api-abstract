import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from './http-instance.factory';
import { APIResponse, APIResponseCollection } from '../../types/strapi/types';

export type ApiBaseTypes = {
    single: unknown;
    many: unknown;
    create: unknown;
    update: unknown;
};

export type ApiStrapiTypes<BaseType> = {
    single: APIResponse<BaseType>;
    many: APIResponseCollection<BaseType>;
    create: Omit<BaseType, 'id'>;
    update: Partial<ApiStrapiTypes<BaseType>['create']>;
};

export type ApiCustomTypes<BaseType, CustomType extends Partial<ApiBaseTypes>> = {
    [K in keyof ApiBaseTypes]: K extends keyof CustomType
        ? CustomType[K]
        : ApiStrapiTypes<BaseType>[K];
};

export abstract class ApiInstance<BaseType, Types extends ApiBaseTypes = ApiStrapiTypes<BaseType>> {
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

export const getApi = <
    BaseType,
    ExtendedApi = ApiInstance<BaseType>,
    Types extends ApiBaseTypes = ApiStrapiTypes<BaseType>,
>(
    endpoint: string,
) => {
    return class Api extends ApiInstance<BaseType, Types> {
        private static instance: ExtendedApi | null = null;

        public static getInstance(): ExtendedApi {
            if (!this.instance) {
                this.instance = new this(endpoint) as ExtendedApi;
            }
            return this.instance;
        }
    };
};
