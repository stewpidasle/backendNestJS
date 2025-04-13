import { unnamed } from '../../../../domain/unnamed';
import { unnamedSchemaClass } from '../entities/unnamed.schema';

export class unnamedMapper {
  public static toDomain(raw: unnamedSchemaClass): unnamed {
    const domainEntity = new unnamed();
    domainEntity.id = raw._id.toString();
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  public static toPersistence(domainEntity: unnamed): unnamedSchemaClass {
    const persistenceSchema = new unnamedSchemaClass();
    if (domainEntity.id) {
      persistenceSchema._id = domainEntity.id;
    }
    persistenceSchema.createdAt = domainEntity.createdAt;
    persistenceSchema.updatedAt = domainEntity.updatedAt;

    return persistenceSchema;
  }
}
