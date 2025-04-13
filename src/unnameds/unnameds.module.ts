import {
  // common
  Module,
} from '@nestjs/common';
import { unnamedsService } from './unnameds.service';
import { unnamedsController } from './unnameds.controller';
import { RelationalunnamedPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import databaseConfig from '../database/config/database.config';
import { DatabaseConfig } from '../database/config/database-config.type';
import { DocumentunnamedPersistenceModule } from './infrastructure/persistence/document/document-persistence.module';

const infrastructurePersistenceModule = (databaseConfig() as DatabaseConfig)
  .isDocumentDatabase
  ? DocumentunnamedPersistenceModule
  : RelationalunnamedPersistenceModule;

@Module({
  imports: [
    // import modules, etc.
    infrastructurePersistenceModule,
  ],
  controllers: [unnamedsController],
  providers: [unnamedsService],
  exports: [unnamedsService, infrastructurePersistenceModule],
})
export class unnamedsModule {}
