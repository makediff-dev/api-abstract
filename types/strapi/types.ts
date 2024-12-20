import type { Modules, Schema, UID, Utils } from '@strapi/strapi';
import axios from 'axios';

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

type GetOriginTypes<TSchemaUID extends StrapiModelUID> = {
    [TSchemaKey in Schema.RequiredAttributeNames<TSchemaUID>]: GetSchemaAttributeValue<
        TSchemaUID,
        TSchemaKey
    >;
} & {
    [TSchemaKey in Schema.OptionalAttributeNames<TSchemaUID>]?: GetSchemaAttributeValue<
        TSchemaUID,
        TSchemaKey
    >;
};

type GetNestedType<
    TSchemaUID extends StrapiModelUID,
    TSchemaKey extends Extract<keyof Schema.Attributes<TSchemaUID>, string>,
    TAttributeField extends string,
> = TAttributeField extends keyof Schema.AttributeByName<TSchemaUID, TSchemaKey>
    ? Schema.AttributeByName<TSchemaUID, TSchemaKey>[TAttributeField] extends StrapiModelUID
        ? GetValidKeys<
              GetStrapiType<Schema.AttributeByName<TSchemaUID, TSchemaKey>[TAttributeField]>,
              Schema.AttributeByName<TSchemaUID, TSchemaKey>[TAttributeField]
          >
        : never
    : unknown;

export type GetStrapiType<TSchemaUID extends StrapiModelUID> = IDs & {
    [K in keyof GetOriginTypes<TSchemaUID>]: K extends Extract<
        keyof Schema.Attributes<TSchemaUID>,
        string
    >
        ? GetNestedType<TSchemaUID, K, 'target'> extends unknown
            ? GetNestedType<TSchemaUID, K, 'component'> extends unknown
                ? GetOriginTypes<TSchemaUID>[K]
                : GetNestedType<TSchemaUID, K, 'component'>
            : GetNestedType<TSchemaUID, K, 'target'>
        : never;
};

const userSchemaUID: StrapiModelUID = 'plugin::users-permissions.user';
type UserSchemaUID = typeof userSchemaUID;

type User = GetValidKeys<{ abc: string }, 'api::car.car'>;

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

type CarsApiRes = APIResponseCollection<'api::car.car'>;
type Car = GetStrapiType<'api::car.car'>;
type OrigCar = Modules.Documents.Params.Attribute.GetValues<'api::car.car'>;
const fn = async () => {
    const car = (await axios.get<Car>('')).data;
    car;
    const origCar = (await axios.get<OrigCar>('')).data;
    origCar.year;
};
