import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { instanceToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { enumerateParser } from 'src/helpers/enumerate-parser.helper';
import {
  flattenData,
  simpleMapModelToResource,
} from 'src/helpers/transform-response.helpers';
import { TransformResponse } from 'src/interfaces/transform.interface';
import { BaseEntity } from '../common/base.entity';
import { Resource } from '../common/resource';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  // TODO: explore this reflector, maybe need this in the future.
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<TransformResponse> {
    return next.handle().pipe(
      map((response) => {
        const { data, count, meta } = response;

        let baseEntities: BaseEntity[] = [];
        const resources: Resource[] = [];
        const included: Resource[] = [];

        if (data instanceof Array === false) {
          // currently, make it as array to response data even if the data is single object
          baseEntities = [data];
        } else {
          baseEntities = data;
        }

        baseEntities.map((baseEntity: BaseEntity) => {
          const res: Resource = {
            ...instanceToInstance(baseEntity), // excluding the object / field
            id: baseEntity?.id?.toString(),
            type: baseEntity?.constructor?.name || '',
          };

          // transform related enum value to be enum key as response
          Object.keys(res).forEach((r) => {
            res[r] = enumerateParser(r, res[r]);
          });

          const flattened = flattenData(res);

          let parent = flattened.pop();
          parent = simpleMapModelToResource(parent);

          resources.push(parent);
          const includes = flattened.map((f) => simpleMapModelToResource(f));

          included.push(...includes);
        });

        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          data: resources,
          included,
          count: count,
          meta: meta,
        };
      }),
    );
  }
}
