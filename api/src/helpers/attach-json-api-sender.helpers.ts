import { NextFunction, Request, Response } from 'express';
import { PageMetaDto } from '../common/dto/page-meta.dto';
import { Resource } from '../common/resource';
import { sendJsonApiError, sendJsonApiResource } from './send-json-api.helpers';

export const attachJsonApiSender = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.sendJsonApiResource = (
    statusCode: number,
    data: Resource | Resource[],
    count?: number,
    meta?: PageMetaDto,
  ) => sendJsonApiResource(statusCode, res, data, count, meta);
  res.sendJsonApiError = (
    statusCode: number,
    title: string,
    description?: string,
  ) => sendJsonApiError(statusCode, res, title, description);
  next();
};
