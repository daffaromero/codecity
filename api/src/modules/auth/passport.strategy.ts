import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthHelper } from 'src/helpers/auth.helper';

@Injectable()
export class CustomPassportStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(@Inject(ConfigService) configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('SECRET_SIGNER'),
      ignoreExpiration: true,
    });
  }

  public async validate(payload: any): Promise<any> {
    return this.helper.validateUser(payload);
  }
}
