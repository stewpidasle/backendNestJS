import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { unnamedSchema, unnamedSchemaClass } from './entities/unnamed.schema';
import { unnamedRepository } from '../unnamed.repository';
import { unnamedDocumentRepository } from './repositories/unnamed.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: unnamedSchemaClass.name, schema: unnamedSchema },
    ]),
  ],
  providers: [
    {
      provide: unnamedRepository,
      useClass: unnamedDocumentRepository,
    },
  ],
  exports: [unnamedRepository],
})
export class DocumentunnamedPersistenceModule {}
