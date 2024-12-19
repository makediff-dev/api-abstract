import type { Modules, UID } from '@strapi/strapi';

type GetStrapiModelKeys<TSchemaUID extends UID.ContentType> = TSchemaUID extends string
    ? keyof GetValues<TSchemaUID>
    : never;
// SHOULD BE EDITED
type StrapiModelKeys = GetStrapiModelKeys<'api::car.car' | 'plugin::users-permissions.user'>;

export type ReassignStrapiModelKeys<T, U extends Partial<Record<StrapiModelKeys, unknown>>> = {
    [K in keyof T]: K extends keyof U ? U[K] : T[K];
};
// SHOULD BE EDITED
export type GetStrapiType<TSchemaUID extends UID.ContentType> = ReassignStrapiModelKeys<
    GetValues<TSchemaUID>,
    {
        car: GetStrapiType<'api::car.car'>;
        user: GetStrapiType<'plugin::users-permissions.user'>;
    }
>;

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
