import { ApiProperty } from '@nestjs/swagger';

export class TokenPayloadDto {
  @ApiProperty()
  expiresIn: number;

  @ApiProperty()
  accessToken: string;
}
