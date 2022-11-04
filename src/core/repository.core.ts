/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */
import { Model, ModelCtor } from 'sequelize-typescript';
import { MakeNullishOptional } from 'sequelize/types/utils';
import { Attributes, BulkCreateOptions, WhereOptions, Includeable, Order } from 'sequelize/types';
import { BaseRepository } from './repository';
import { BaseError } from './baseError.core';

class ResourceNotFoundError extends BaseError {
  constructor(public originalName?: string, public stackTrace?: string) {
    super(404, 'ResourceNotFoundError', 'Resource Not Found', 'The requested resource was not found or does not exist.', originalName, stackTrace);
  }
}

export default abstract class SequelizeBaseRepository<M extends Model> implements BaseRepository {
  public model!: ModelCtor<M>;

  constructor(model: ModelCtor<M>) {
    this.model = model;
  }

  public async findAll(
    query?: WhereOptions<Attributes<M>>,
    attributes?: string[],
    include?: Includeable | Includeable[] | undefined,
    order?: Order | undefined
  ): Promise<M[]> {
    const resource = await this.model.findAll({
      where: query,
      attributes,
      include,
      order,
    });
    if (resource) {
      return resource;
    }

    throw new ResourceNotFoundError();
  }

  public async findById(id: number, attributes?: string[]): Promise<M> {
    const resource = await this.model.findByPk(id, {
      attributes,
    });

    if (resource) {
      return resource;
    }

    throw new ResourceNotFoundError();
  }

  public async findOne(
    query: WhereOptions<Attributes<M>>,
    attributes?: string[],
    include?: Includeable | Includeable[] | undefined,
    order?: Order | undefined
  ): Promise<M | null> {
    const resource = await this.model.findOne({
      where: query,
      attributes,
      include,
      order,
    });
    return resource;

    // throw new ResourceNotFoundError();
  }

  public async create(data: MakeNullishOptional<M['_creationAttributes']>): Promise<M> {
    const resource = this.model.create<M>(data);
    if (!resource) {
      throw new ResourceNotFoundError();
    }
    return resource;
  }

  public async bulkCreate(
    data: readonly MakeNullishOptional<M['_creationAttributes']>[],
    options?: BulkCreateOptions<Attributes<M>> | undefined
  ): Promise<M[]> {
    const resource = this.model.bulkCreate<M>(data);
    if (!resource) {
      throw new ResourceNotFoundError();
    }
    return resource;
  }

  public async update(query: WhereOptions<Attributes<M>>, data: any): Promise<M> {
    const resource = await this.findOne(query);

    if (resource) {
      return resource.update(data);
    }

    throw new ResourceNotFoundError();
  }

  public query(query: string): Promise<M> {
    return this.query(query);

    // throw new ResourceNotFoundError();
  }

  public async delete(query: WhereOptions<Attributes<M>>, clearAllRecords?: boolean): Promise<boolean> {
    const resource = await this.findOne(query);
    if (clearAllRecords) {
      await this.model.destroy({ where: {} });
      return true;
    }
    if (resource) {
      await resource.destroy();
      return true;
    }
    throw new ResourceNotFoundError();
  }
}
