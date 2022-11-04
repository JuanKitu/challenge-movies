/* eslint-disable no-unused-vars */
import { Model } from 'sequelize-typescript';
import { Includeable, WhereOptions, Order } from 'sequelize/types';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { BulkCreateOptions } from 'sequelize';

export interface BaseRepository {
  findAll(
    query?: WhereOptions,
    attributes?: string[],
    include?: Includeable | Includeable[] | undefined,
    order?: Order | undefined
  ): Promise<Model[]>;

  findById(id: number, attributes?: string[]): Promise<Model>;

  findOne(
    query: WhereOptions,
    attributes?: string[],
    include?: Includeable | Includeable[] | undefined,
    order?: Order | undefined
  ): Promise<Model | null>;

  create(data: MakeNullishOptional): Promise<Model>;

  bulkCreate(data: MakeNullishOptional, options?: BulkCreateOptions): Promise<Model[]>;

  update(query: WhereOptions, data: Model): Promise<Model>;
  query(query: string): Promise<Model>;
  delete(query: WhereOptions, clearAllRecords?: boolean): Promise<boolean>;
}
