import type { Schema, UID } from '@strapi/strapi';

type ReassignStrapiModelKeys<
    TSchemaUID extends UID.ContentType,
    TSchemaAttributes = Schema.Attributes<TSchemaUID>,
> = {
    [Attribute in keyof TSchemaAttributes]: Attribute extends Extract<
        keyof Schema.Attributes<TSchemaUID>,
        string
    >
        ? Schema.AttributeValueByName<TSchemaUID, Attribute>
        : never;
};

export type GetStrapiType<TSchemaUID extends UID.ContentType> = ReassignStrapiModelKeys<TSchemaUID>;

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
