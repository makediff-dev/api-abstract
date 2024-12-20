import type { Schema, UID, Utils } from '@strapi/strapi';

export type StrapiModelUID = UID.ContentType | UID.Component;
type IDs = { id: number; documentId: string };

type InvalidKeys<TSchemaUID extends StrapiModelUID> = Utils.Object.KeysBy<
    Schema.Attributes<TSchemaUID>,
    Schema.Attribute.Private | Schema.Attribute.Password
>;
type GetValidKeys<T, TSchemaUID extends StrapiModelUID> = Omit<T, InvalidKeys<TSchemaUID>>;

type GetSchemaAttributeValue<TSchemaUID extends StrapiModelUID, TSchemaKey extends string> =
    TSchemaKey extends Extract<keyof Schema.Attributes<TSchemaUID>, string>
        ? Schema.AttributeValueByName<TSchemaUID, TSchemaKey>
        : never;

type GetOriginTypes<TSchemaUID extends StrapiModelUID> = GetValidKeys<
    {
        [TSchemaKey in Schema.RequiredAttributeNames<TSchemaUID>]: GetSchemaAttributeValue<
            TSchemaUID,
            TSchemaKey
        >;
    } & {
        [TSchemaKey in Schema.OptionalAttributeNames<TSchemaUID>]?: GetSchemaAttributeValue<
            TSchemaUID,
            TSchemaKey
        >;
    },
    TSchemaUID
>;

export type GetStrapiType<TSchemaUID extends StrapiModelUID> = IDs & {
    [K in keyof GetOriginTypes<TSchemaUID>]: K extends Extract<
        keyof Schema.Attributes<TSchemaUID>,
        string
    >
        ? 'target' extends keyof Schema.AttributeByName<TSchemaUID, K>
            ? Schema.AttributeByName<TSchemaUID, K>['target'] extends StrapiModelUID
                ? GetStrapiType<Schema.AttributeByName<TSchemaUID, K>['target']>
                : never
            : 'component' extends keyof Schema.AttributeByName<TSchemaUID, K>
              ? Schema.AttributeByName<TSchemaUID, K>['component'] extends StrapiModelUID
                  ? GetStrapiType<Schema.AttributeByName<TSchemaUID, K>['component']>
                  : never
              : GetOriginTypes<TSchemaUID>[K]
        : never;
};

const userSchemaUID: StrapiModelUID = 'plugin::users-permissions.user';
type UserSchemaUID = typeof userSchemaUID;

export type APIResponse<TSchemaUID extends StrapiModelUID> = TSchemaUID extends UserSchemaUID
    ? GetStrapiType<TSchemaUID>
    : {
          data: GetStrapiType<TSchemaUID>;
      };

export interface APIResponseCollectionMetadata {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export type APIResponseCollection<TSchemaUID extends StrapiModelUID> =
    TSchemaUID extends UserSchemaUID
        ? GetStrapiType<TSchemaUID>[]
        : {
              data: GetStrapiType<TSchemaUID>[];
              meta: APIResponseCollectionMetadata;
          };
