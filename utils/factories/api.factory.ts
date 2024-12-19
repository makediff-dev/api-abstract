import { AxiosInstance } from 'axios';
import { HttpInstanceFactory } from './http-instance.factory';

export abstract class ApiInstance<SingleCopy, ManyCopies, CreateData, UpdateData> {
    protected httpInstance: AxiosInstance;
    protected endpoint: string;

    protected constructor(endpoint: string) {
        this.endpoint = endpoint;
        this.httpInstance = HttpInstanceFactory.getInstance();
    }

    public async findOne(id: string | number): Promise<SingleCopy> {
        const res = await this.httpInstance.get<SingleCopy>(`${this.endpoint}/${id}`);
        return res.data;
    }

    public async findMany(): Promise<ManyCopies> {
        const res = await this.httpInstance.get<ManyCopies>(this.endpoint);
        return res.data;
    }

    public async create(data: CreateData): Promise<SingleCopy> {
        const res = await this.httpInstance.post<SingleCopy>(this.endpoint, data);
        return res.data;
    }

    public async update(id: string | number, data: UpdateData): Promise<SingleCopy> {
        const res = await this.httpInstance.put<SingleCopy>(`${this.endpoint}/${id}`, data);
        return res.data;
    }

    public async delete(id: string | number): Promise<SingleCopy> {
        const res = await this.httpInstance.put<SingleCopy>(`${this.endpoint}/${id}`);
        return res.data;
    }
}

export const getBaseApi = <SingleCopy, ManyCopies, CreateData, UpdateData>(endpoint: string) => {
    return class Api extends ApiInstance<SingleCopy, ManyCopies, CreateData, UpdateData> {
        private static instance: Api | null = null;

        public static getInstance(): Api {
            if (!this.instance) {
                this.instance = new this(endpoint);
            }
            return this.instance;
        }
    };
};

export const getExtendedApi = <SingleCopy, ManyCopies, CreateData, UpdateData, ExtendedApi extends ApiInstance<SingleCopy, ManyCopies, CreateData, UpdateData>>(endpoint: string) => {
    return class Api extends ApiInstance<SingleCopy, ManyCopies, CreateData, UpdateData> {
        private static instance: ExtendedApi | null = null;

        public static getInstance(): ExtendedApi {
            if (!this.instance) {
                this.instance = new this(endpoint) as unknown as ExtendedApi;
            }
            return this.instance as ExtendedApi;
        }
    };
};
