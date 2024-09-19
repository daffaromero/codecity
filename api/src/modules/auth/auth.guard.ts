import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Staff } from '../staff/entities/staff.entity';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public constructor(private readonly reflector: Reflector) {
    super(reflector);
  }

  public handleRequest(err: unknown, user: Staff): any {
    return user;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const { user }: Request = request;

    if (user) {
      return true;
    }

    return false;
  }
}
