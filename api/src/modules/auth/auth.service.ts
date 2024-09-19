import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthHelper } from 'src/helpers/auth.helper';
import { FindOptionsWhere } from 'typeorm';
import { validateHash } from '../../helpers/password.helpers';
import { TokenType } from '../../types/enums';
import { AuthLogin } from './dto/login-payload.dto';
import { SelfUser, SelfRequestDto } from './dto/self-user.dto';
import { TokenPayloadDto } from './dto/token-payload';
import { UserLoginDto } from './dto/user-login.dto';
import { Staff } from '../staff/entities/staff.entity';
import {
  NoStaffFoundError,
  WrongPasswordError,
} from '../../errors/ResourceError';

@Injectable()
export class AuthService {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  constructor(private jwtService: JwtService) {}

  private async validateUser(validateWith: { id?: string; username?: string }) {
    let user: Staff | undefined = undefined;
    let where: FindOptionsWhere<Staff> | undefined = undefined;

    if (validateWith.id) where = { id: validateWith.id };
    if (validateWith.username) where = { username: validateWith.username };

    user = await Staff.findOne({
      where,
    });
    return user;
  }

  public async login(body: UserLoginDto): Promise<AuthLogin> {
    const { username, password } = body;

    const user: Staff = await this.validateUser({
      username: username,
    });

    if (!user) {
      NoStaffFoundError();
    }

    const isPasswordValid: boolean = await validateHash(
      password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      WrongPasswordError();
    }

    const token = new TokenPayloadDto();
    token.expiresIn = 86400;
    token.accessToken = await this.helper.generateToken({
      id: user.id.toString(),
      type: TokenType.ACCESS_TOKEN,
    });

    user.accessToken = token.accessToken;
    user.save();

    const loginPayload = new AuthLogin();
    loginPayload.ownerUser = user;
    loginPayload.expiredIn = token.expiresIn;
    loginPayload.accessToken = token.accessToken;
    loginPayload.lastLoggedInAt = new Date();

    return loginPayload;
  }

  public async self(self: SelfRequestDto): Promise<SelfUser> {
    const user = await this.validateUser({
      id: self.id,
    });

    const selfUser = new SelfUser();
    selfUser.id = user.id;
    selfUser.username = user.username;

    return selfUser;
  }

  public async logout(self: SelfRequestDto): Promise<boolean> {
    const user = await this.validateUser({
      id: self.id,
    });

    if (!user) {
      NoStaffFoundError();
    }

    user.accessToken = null;
    user.save();

    return true;
  }
}
