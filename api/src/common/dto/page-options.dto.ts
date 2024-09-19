import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
import { StringFieldOptional } from 'src/helpers/field.helpers';
import { OrderTypeEnum } from 'src/types/enums';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: OrderTypeEnum, default: OrderTypeEnum.ASC })
  @IsEnum(OrderTypeEnum)
  @IsOptional()
  readonly order?: OrderTypeEnum = OrderTypeEnum.ASC;

  @ApiPropertyOptional({
    minimum: 0,
    default: 0,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  @IsOptional()
  readonly page?: number = 0;

  @ApiPropertyOptional({
    minimum: 1,
    default: 5,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly pageSize?: number = 5;

  get skip(): number {
    return this.page * this.pageSize;
  }

  @StringFieldOptional()
  readonly q?: string;
}
