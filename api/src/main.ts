import * as bodyParser from 'body-parser';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { attachJsonApiSender } from './helpers/attach-json-api-sender.helpers';
import { jsonApiBodyValidatorAndFormatter } from './helpers/json-body-validator.helpers';
import { DatabaseConfigService } from './shared/config/database.service';
import { SharedModule } from './shared/shared.module';
import { TransformResponseInterceptor } from './interceptors/transform-response.interceptor';
import { JwtAuthGuard } from './modules/auth/auth.guard';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    {
      logger: ['error', 'warn'],
      cors: true,
    },
  );
  app.setGlobalPrefix('api');
  app.use(helmet());
  app.enable('trust proxy');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    attachJsonApiSender,
    bodyParser.json(),
    jsonApiBodyValidatorAndFormatter,
  );
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalGuards(new JwtAuthGuard(app.get(Reflector)));
  app.useGlobalInterceptors(
    new TransformResponseInterceptor(app.get(Reflector)),
  );
  const configService = app.select(SharedModule).get(DatabaseConfigService);
  if (!configService.isDevelopment) {
    app.enableShutdownHooks();
  }
  const port = configService.appConfig.port;
  await app.listen(port);

  console.log(`server running on port ${port}`);
  console.log(`server is running on ${configService.nodeEnv} mode`);
  return app;
}

void bootstrap();
