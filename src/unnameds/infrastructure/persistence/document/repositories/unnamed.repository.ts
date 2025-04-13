import { Injectable } from '@nestjs/common';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { unnamedSchemaClass } from '../entities/unnamed.schema';
import { unnamedRepository } from '../../unnamed.repository';
import { unnamed } from '../../../../domain/unnamed';
import { unnamedMapper } from '../mappers/unnamed.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class unnamedDocumentRepository implements unnamedRepository {
  constructor(
    @InjectModel(unnamedSchemaClass.name)
    private readonly unnamedModel: Model<unnamedSchemaClass>,
  ) {}

  async create(data: unnamed): Promise<unnamed> {
    const persistenceModel = unnamedMapper.toPersistence(data);
    const createdEntity = new this.unnamedModel(persistenceModel);
    const entityObject = await createdEntity.save();
    return unnamedMapper.toDomain(entityObject);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<unnamed[]> {
    const entityObjects = await this.unnamedModel
      .find()
      .skip((paginationOptions.page - 1) * paginationOptions.limit)
      .limit(paginationOptions.limit);

    return entityObjects.map((entityObject) =>
      unnamedMapper.toDomain(entityObject),
    );
  }

  async findById(id: unnamed['id']): Promise<NullableType<unnamed>> {
    const entityObject = await this.unnamedModel.findById(id);
    return entityObject ? unnamedMapper.toDomain(entityObject) : null;
  }

  async findByIds(ids: unnamed['id'][]): Promise<unnamed[]> {
    const entityObjects = await this.unnamedModel.find({ _id: { $in: ids } });
    return entityObjects.map((entityObject) =>
      unnamedMapper.toDomain(entityObject),
    );
  }

  async update(
    id: unnamed['id'],
    payload: Partial<unnamed>,
  ): Promise<NullableType<unnamed>> {
    const clonedPayload = { ...payload };
    delete clonedPayload.id;

    const filter = { _id: id.toString() };
    const entity = await this.unnamedModel.findOne(filter);

    if (!entity) {
      throw new Error('Record not found');
    }

    const entityObject = await this.unnamedModel.findOneAndUpdate(
      filter,
      unnamedMapper.toPersistence({
        ...unnamedMapper.toDomain(entity),
        ...clonedPayload,
      }),
      { new: true },
    );

    return entityObject ? unnamedMapper.toDomain(entityObject) : null;
  }

  async remove(id: unnamed['id']): Promise<void> {
    await this.unnamedModel.deleteOne({ _id: id });
  }
}
