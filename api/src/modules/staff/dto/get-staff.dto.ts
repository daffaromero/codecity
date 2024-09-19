import { IsOptional, IsString } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';

export class GetStaffDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  email?: string;
}
