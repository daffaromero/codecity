import { ApiProperty } from '@nestjs/swagger';
import { Resource } from '../../../common/resource';
import { SelfUser } from './self-user.dto';

export class AuthLogin extends Resource {
  @ApiProperty({ type: SelfUser })
  ownerUser: SelfUser;

  @ApiProperty()
  expiredIn: number;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  lastLoggedInAt: Date;
}
