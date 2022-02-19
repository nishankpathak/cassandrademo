import {Entity, model, property} from '@loopback/repository';
@model()
export class Address {
  @property({
    type: 'string'
  })
  street: string;

  @property({
    type: 'string'
  })
  city: string;

  @property({
    type: 'string'
  })
  state_or_province: string;

  @property({
    type: 'string'
  })
  postal_code: string;

  @property({
    type: 'string'
  })
  country: string;
}
@model({name: 'hotels'})
export class Hotels extends Entity {
  @property({
    type: 'string',
    id: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'Object',
    required: true
  })
  address: Address;

  @property({
    type: 'array',
    itemType: 'string'
  })
  pois: string[];

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Hotels>) {
    super(data);
  }
}

export interface HotelsRelations {
  // describe navigational properties here
}

export type HotelsWithRelations = Hotels & HotelsRelations;
