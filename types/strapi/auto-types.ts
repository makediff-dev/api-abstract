import { Schema, UID } from '@strapi/strapi';

// type ReassignStrapiModelKeys<
//     TSchemaUID extends UID.ContentType,
//     TSchemaAttributes = Schema.Attributes<TSchemaUID>,
// > = {
//     [Attribute in keyof TSchemaAttributes]: 'type' extends keyof TSchemaAttributes[Attribute]
//         ? TSchemaAttributes[Attribute]['type'] extends 'relation'
//             ? 'target' extends keyof TSchemaAttributes[Attribute]
//                 ? TSchemaAttributes[Attribute]['target'] extends UID.ContentType
//                     ? GetStrapiType<TSchemaAttributes[Attribute]['target']>
//                     : never
//                 : never
//             : Attribute extends keyof GetValues<TSchemaUID>
//               ? GetValues<TSchemaUID>[Attribute]
//               : never
//         : never;
// };
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
type Car = GetStrapiType<'api::car.car'>;
