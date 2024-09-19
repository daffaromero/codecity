import { Transform } from 'class-transformer';
import { parsePhoneNumber } from 'libphonenumber-js';
import { castArray, isArray, isNil, map, trim } from 'lodash';
import { Resource } from 'src/common/resource';
import { BaseEntity } from 'src/common/base.entity';
import { TransformApiResource } from 'src/interfaces/transform.interface';
import { camelCase } from 'change-case';
import { enumerateParser } from './enumerate-parser.helper';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns PropertyDecorator
 * @constructor
 */
export function Trim(): PropertyDecorator {
  return Transform((params) => {
    const value = params.value as string[] | string;

    if (isArray(value)) {
      return map(value, (v) => trim(v).replace(/\s\s+/g, ' '));
    }

    return trim(value).replace(/\s\s+/g, ' ');
  });
}

export function ToBoolean(): PropertyDecorator {
  return Transform(
    (params) => {
      switch (params.value) {
        case 'true':
          return true;
        case 'false':
          return false;
        default:
          return params.value;
      }
    },
    { toClassOnly: true },
  );
}

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns PropertyDecorator
 * @constructor
 */
export function ToInt(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value as string;

      return Number.parseInt(value, 10);
    },
    { toClassOnly: true },
  );
}

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export function ToArray(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (isNil(value)) {
        return [];
      }

      return castArray(value);
    },
    { toClassOnly: true },
  );
}

export function ToLowerCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toLowerCase();
      }

      return value.map((v) => v.toLowerCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function ToUpperCase(): PropertyDecorator {
  return Transform(
    (params) => {
      const value = params.value;

      if (!value) {
        return;
      }

      if (!Array.isArray(value)) {
        return value.toUpperCase();
      }

      return value.map((v) => v.toUpperCase());
    },
    {
      toClassOnly: true,
    },
  );
}

export function PhoneNumberSerializer(): PropertyDecorator {
  return Transform((params) => parsePhoneNumber(params.value as string).number);
}

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

export const simpleMapModelToResource = (
  datum: Resource,
): TransformApiResource => {
  // Convert type into regular object.
  const resourceDict: any = datum;

  const type = camelCase(
    datum.type?.replace('Dto', '') || datum.constructor.name.replace('Dto', ''),
  );

  Object.keys(resourceDict).forEach((rd) => {
    resourceDict[rd] = enumerateParser(rd, resourceDict[rd]);
  });

  return {
    id: datum?.id?.toString(), // Resource ID must be stored as string.
    type, // Camelize type.
    attributes: {
      ...resourceDict,
      type,
    },
  };
};

/**
 * Unique Resource.
 *
 * Remove duplicate value in object array
 *
 * Returns an unique array of Resources.
 * @param arr the array of resource or transform api resource.
 */

export const uniqueResource = (
  arr: (Resource | TransformApiResource)[],
): (Resource | TransformApiResource)[] => {
  const res = {};

  arr.forEach((obj: Resource) => {
    const key = `${obj.id}`;
    if (!res[key]) {
      res[key] = { ...obj };
    }
  });

  return Object.values(res);
};
