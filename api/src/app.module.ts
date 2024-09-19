import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from './shared/shared.module';
import { DatabaseConfigService } from './shared/config/database.service';
import { StaffModule } from './modules/staff/staff.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: DatabaseConfigService) =>
        configService.postgresConfig,
      inject: [DatabaseConfigService],
    }),
    StaffModule,
    AuthModule,
  ],
})
export class AppModule {}
