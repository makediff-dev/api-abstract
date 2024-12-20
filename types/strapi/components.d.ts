import type { Schema, Struct } from '@strapi/strapi';

export interface CarDvigatel extends Struct.ComponentSchema {
  collectionName: 'components_car_dvigatel';
  info: {
    description: '';
    displayName: '\u0414\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044C';
    icon: 'briefcase';
  };
  attributes: {
    creator: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    volume: Schema.Attribute.Decimal;
    year: Schema.Attribute.Integer;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'car.dvigatel': CarDvigatel;
    }
  }
}
