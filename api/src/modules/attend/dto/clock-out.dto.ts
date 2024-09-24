import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClockOutDto {
  @ApiProperty()
  @IsString()
  staffId: string;
}
