import type { Schema, UID } from '@strapi/strapi';

type UseOriginTypes<TSchemaUID extends UID.ContentType> = {
    [Attribute in keyof Schema.Attributes<TSchemaUID>]: Attribute extends Extract<
        keyof Schema.Attributes<TSchemaUID>,
        string
    >
        ? Schema.AttributeValueByName<TSchemaUID, Attribute>
        : never;
};

export type GetStrapiType<TSchemaUID extends UID.ContentType> = UseOriginTypes<TSchemaUID>;

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
