import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from './http-instance.factory';

export abstract class ApiInstance<O, M, C, U> {
    protected httpInstance: AxiosInstance;
    protected endpoint: string;

    protected constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.httpInstance = HttpInstanceFactory.getInstance();
    }

    public async findOne(id: string | number): Promise<O> {
        const res = await this.httpInstance.get<O>(`${this.endpoint}/${id}`);
        return res.data;
    }

    public async findMany(): Promise<M> {
        const res = await this.httpInstance.get<M>(this.endpoint);
        return res.data;
    }

    public async create(data: C): Promise<O> {
        const res = await this.httpInstance.post<O>(this.endpoint, data);
        return res.data;
    }

    public async update(id: string | number, data: U): Promise<O> {
        const res = await this.httpInstance.put<O>(`${this.endpoint}/${id}`, data);
        return res.data;
    }

    public async delete(id: string | number): Promise<O> {
        const res = await this.httpInstance.put<O>(`${this.endpoint}/${id}`);
        return res.data;
    }
}

export const getBaseApi = <O, M, U, C>(endpoint: string) => {
    return class Api extends ApiInstance<O, M, U, C> {
        private static instance: Api | null = null;

        public static getInstance(): Api {
            if (!this.instance) {
                this.instance = new this(endpoint);
            }
            return this.instance;
        }
    };
};

export const getExtendedApi = <O, M, U, C, E extends ApiInstance<O, M, U, C>>(endpoint: string) => {
    return class Api extends ApiInstance<O, M, U, C> {
        private static instance: E | null = null;

        public static getInstance(): E {
            if (!this.instance) {
                this.instance = new this(endpoint) as unknown as E;
            }
            return this.instance as E;
        }
    };
};
