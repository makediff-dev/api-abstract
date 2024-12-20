import type { Schema, UID } from '@strapi/strapi';

export type StrapiModelUID = UID.ContentType;

type UseOriginTypes<TSchemaUID extends StrapiModelUID> = {
    [Attribute in keyof Schema.Attributes<TSchemaUID>]: Attribute extends Extract<
        keyof Schema.Attributes<TSchemaUID>,
        string
    >
        ? Schema.AttributeValueByName<TSchemaUID, Attribute>
        : never;
};

export type GetStrapiType<TSchemaUID extends StrapiModelUID> = UseOriginTypes<TSchemaUID>;

export interface APIResponseCollectionMetadata {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

const userSchemaUID: StrapiModelUID = 'plugin::users-permissions.user';
type UserSchemaUID = typeof userSchemaUID;

export type APIResponse<TSchemaUID extends StrapiModelUID> = TSchemaUID extends UserSchemaUID
    ? GetStrapiType<TSchemaUID>
    : {
          data: GetStrapiType<TSchemaUID>;
      };

export type APIResponseCollection<TSchemaUID extends StrapiModelUID> =
    TSchemaUID extends UserSchemaUID
        ? GetStrapiType<TSchemaUID>[]
        : {
              data: GetStrapiType<TSchemaUID>[];
              meta: APIResponseCollectionMetadata;
          };
