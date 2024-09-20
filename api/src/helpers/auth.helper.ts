import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NoStaffFoundError } from '../errors/ResourceError';
import { Staff } from '../modules/staff/entities/staff.entity';

@Injectable()
export class AuthHelper {
  private readonly jwt: JwtService;
  constructor(jwt: JwtService) {
    this.jwt = jwt;
  }

  // Decoding the JWT Token
  public async decode(token: string): Promise<unknown> {
    const decoded = this.jwt.decode(token, null);
    return decoded;
  }

  // Get User by User ID we get from decode()
  public async validateUser(payload: any): Promise<Staff> {
    const user: Staff = await Staff.findOne({
      where: { id: payload?.id },
    });

    return user;
  }

  // Generate JWT Token
  public async generateToken(body: {
    [key: string]: string | number;
  }): Promise<string> {
    const token = await this.jwt.signAsync(body);
    return token;
  }

  // Validate JWT Token, throw forbidden error if JWT Token is invalid
  private async validate(token: string): Promise<boolean | never> {
    try {
      const decoded: unknown = this.jwt.verify(token);

      const user: Staff = await this.validateUser(decoded);

      if (!user) {
        NoStaffFoundError();
      }

      return true;
    } catch (error) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }
}
