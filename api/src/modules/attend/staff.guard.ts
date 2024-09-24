import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class StaffIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const user = request.user;
    const staffId = request.params.staffId;

    if (user && user.id === staffId) {
      return true;
    }

    throw new ForbiddenException('You are not allowed to access this resource');
  }
}
