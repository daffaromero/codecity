import { BaseEntity } from 'src/common/base.entity';
import { PageMetaDto } from 'src/common/dto/page-meta.dto';
import { PageDto } from 'src/common/dto/page.dto';
import { Resource } from 'src/common/resource';

export interface TransformResponse {
  statusCode: number;
  data: Resource | Resource[] | BaseEntity | BaseEntity[] | PageDto<Resource>;
  count?: number;
  meta?: PageMetaDto;
}

export interface TransformApiResource {
  id: string;
  type: string;
  attributes: Resource;
}
