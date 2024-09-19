import { camelCase } from 'change-case';
import { Response } from 'express';
import ApiError from '../errors/ApiError';
import { BaseEntity } from '../common/base.entity';
import { Resource } from '../common/resource';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { HttpStatus } from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';

/**
 * The interface that defines the resource sent to client.
 */
export interface ApiResource {
  /**
   * The unique identifier (ID) of the resource.
   */
  id: string;

  /**
   * The type of the resource.
   */
  type: string;

  /**
   * The attributes of the resource.
   */
  attributes: Resource;
}

/**
 * Sends response that follows standard JSON API format.
 * @param statusCode status code sent alongside the request.
 * @param res Express' response object.
 * @param data An array of entities.
 */
export const sendJsonApiResource = (
  statusCode: number,
  res: Response,
  data: Resource | Resource[] | BaseEntity | BaseEntity[],
  count?: number,
  meta?: PageMetaDto,
) => {
  let result: Resource[];
  let resourceData: Resource | Resource[];
  const included: Resource[] = [];

  if (
    data instanceof BaseEntity ||
    (data instanceof Array && data?.[0] instanceof BaseEntity)
  ) {
    resourceData = convertBaseEntityToResource(
      data as BaseEntity | BaseEntity[],
    );
  } else {
    resourceData = data as Resource | Resource[];
  }

  if (Array.isArray(resourceData)) {
    result = resourceData;
  } else {
    result = [resourceData];
  }

  result = result.map((datum: Resource) => {
    const flattened = flattenData(datum);
    let parent = flattened.pop();
    parent = simpleMapModelToResource(parent);

    included.push(
      ...flattened.map((f) => {
        return simpleMapModelToResource(f);
      }),
    );
    return parent;
  });

  res.status(statusCode);
  res.send({
    data: result,
    included,
    count,
    meta,
  });
};

/**
 * TODO: Right now this is a temporary solution for mapping users
 * info to just shallow user info. Refactor this in the future.
 */
export const convertBaseEntityToResource = (
  data: BaseEntity | BaseEntity[],
): Resource | Resource[] => {
  if (data instanceof BaseEntity) {
    const resource: Resource = {
      ...data,
      id: data?.id.toString(),
      type: data.constructor.name,
    } as Resource;
    return resource;
  }

  if (data instanceof Array) {
    const resource: Resource[] = data.map(
      (datum) =>
        ({
          ...datum,
          id: datum?.id.toString(),
          type: datum.constructor.name,
        } as Resource),
    );
    return resource;
  }
};

/**
 * Flattens a nested Resource.
 *
 * Recursively normalizes nested objects into their ids
 * and collect them along the way.
 *
 * It also prefixes nested attributes with "Id".
 *
 * Returns an array of "normalized" Resources.
 * @param datum The root Resource object to be flattened.
 */
export const flattenData = (datum: Resource): Resource[] => {
  if (!datum) {
    return [];
  }

  const result: Resource[] = [];
  const datumAny: any = datum;

  for (const [key, value] of Object.entries(datum)) {
    let vals = value;
    if (vals?.constructor?.name !== 'Array') vals = [value];
    for (const val of vals) {
      if (
        val?.constructor.name.includes('Resource') ||
        val instanceof BaseEntity
      ) {
        const flattenedValue = flattenData(val);
        result.push(...flattenedValue);
        const ifArray = datumAny[key]?.constructor?.name === 'Array';
        if (datumAny[key]) {
          datumAny[key + (ifArray ? 'Ids' : 'Id')] = ifArray
            ? datumAny[key].map((d: any) => d.id)
            : datumAny[key].id;
          delete datumAny[key];
        }
      }
    }
  }

  result.push(datumAny);
  return result;
};

/**
 * Sends response that follows standard JSON API format.
 * @param statusCode status code sent alongside the request.
 * @param res Express' response object.
 * @param data An array of entities.
 */
export const sendJsonApiError = (
  statusCode: number,
  res: Response,
  title?: string,
  description?: string,
) => {
  res.status(statusCode);

  res.send({
    error: {
      title,
      description,
    },
  });
};

/**
 * Turns a Normal Resource object into an APIResource Object.
 */
export const simpleMapModelToResource = (datum: Resource): ApiResource => {
  // Convert type into regular object.
  const resourceDict: any = instanceToPlain(datum);

  const type = camelCase(
    datum.type || datum.constructor.name.replace('Resource', ''),
  );

  if (type === 'object') {
    throw new ApiError(
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Resource has no type.',
      'Type is not defined in the resource object.',
    );
  }

  return {
    id: datum?.id?.toString(), // Resource ID must be stored as string.
    type, // Camelize type.
    attributes: {
      type,
      ...resourceDict,
    },
  };
};
