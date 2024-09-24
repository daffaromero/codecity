import { IsOptional, IsString, IsDateString, IsBoolean } from 'class-validator';
import { PageOptionsDto } from 'src/common/dto/page-options.dto';
import { ToBoolean } from 'src/helpers/transform-response.helpers';

export class GetAttendanceStatusDto extends PageOptionsDto {
  @IsString()
  @IsOptional()
  staffId?: string;

  @IsDateString()
  @IsOptional()
  clockIn?: Date;

  @IsBoolean()
  @IsOptional()
  @ToBoolean()
  clockedIn?: boolean;

  @IsDateString()
  @IsOptional()
  date?: Date;
}
