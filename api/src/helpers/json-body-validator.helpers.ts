import { NextFunction, Request, Response } from 'express';
import { object, string } from 'yup';

export const jsonApiBodyValidatorAndFormatter = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (Object.keys(req.body).length > 0) {
    const jsonApiRequestBodySchema = object().shape({
      data: object()
        .shape({
          type: string(),
          attributes: object().required(),
        })
        .required(),
    });
    const jsonApiBody: any = jsonApiRequestBodySchema.validateSync(req.body);
    req.body = {
      type: jsonApiBody.data.type,
      ...jsonApiBody.data.attributes,
    };
  }
  next();
};
