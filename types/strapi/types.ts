import type { Modules, UID } from '@strapi/strapi';

export type ReassignKey<T, K extends keyof T, NewValue> = Omit<T, K> & {
    K: NewValue;
};

export type GetValues<TSchemaUID extends UID.ContentType> =
    Modules.Documents.Params.Attribute.GetValues<TSchemaUID>;

export interface APIResponseCollectionMetadata {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface APIResponse<T> {
    data: T;
}

export interface APIResponseCollection<T> {
    data: T[];
    meta: APIResponseCollectionMetadata;
}
