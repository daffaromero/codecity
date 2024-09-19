import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthHelper } from 'src/helpers/auth.helper';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomPassportStrategy } from './passport.strategy';
import { Staff } from '../staff/entities/staff.entity';

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthHelper, CustomPassportStrategy],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('SECRET_SIGNER'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') },
      }),
    }),
    TypeOrmModule.forFeature([Staff]),
  ],
  exports: [],
})
export class AuthModule {}
