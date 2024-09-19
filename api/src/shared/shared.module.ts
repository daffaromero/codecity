import { Global, Module } from '@nestjs/common';
import { DatabaseConfigService } from './config/database.service';

const providers = [DatabaseConfigService];

@Global()
@Module({
  providers,
  exports: [...providers],
})
export class SharedModule {}
