import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingHelpers } from 'src/helpers/snake-naming.helpers';
import { isNil } from 'lodash';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService?: ConfigService) {}

  get isDevelopment(): boolean {
    return this.configService.get('NODE_ENV') === 'development';
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }

  get isTest(): boolean {
    return this.configService.get('NODE_ENV') === 'test';
  }

  private getNumber(key: string): number {
    return Number(this.configService.get(key));
  }

  private getBoolean(key: string): boolean {
    return Boolean(this.configService.get(key));
  }

  private getString(key: string): string {
    return String(this.configService.get(key));
  }

  get nodeEnv(): string {
    return this.getString('NODE_ENV');
  }

  get postgresConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../../modules/**/*.entity{.ts,.js}'];
    const migrations = [__dirname + '/../../database/migrations/*{.ts,.js}'];

    return {
      entities,
      migrations,
      dropSchema: this.isTest,
      type: 'postgres',
      name: 'default',
      host: this.getString('DB_HOST'),
      port: this.getNumber('DB_PORT'),
      username: this.getString('DB_USERNAME'),
      password: this.getString('DB_PASSWORD'),
      database: this.getString('DB_NAME'),
      migrationsRun: true,
      synchronize: true,
      logging: this.getBoolean('ENABLE_ORM_LOGS'),
      namingStrategy: new SnakeNamingHelpers(),
    };
  }

  get appConfig() {
    return {
      port: this.getString('PORT'),
    };
  }

  private get(key: string): string {
    const value = this.configService.get<string>(key);

    if (isNil(value)) {
      throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
    }

    return value;
  }
}
