import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ClockInDto {
  @ApiProperty()
  @IsString()
  staffId: string;
}
