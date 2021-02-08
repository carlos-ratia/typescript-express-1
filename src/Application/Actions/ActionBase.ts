import { NextFunction, Request, Response } from "express";
import PromiseB from "bluebird";

export abstract class ActionBase {
  call = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    return PromiseB.try(() => {
      return this.doCall({ req: req, res: res });
    })
      .then((result) => {
        res.status(200).json({
          statusCode: 200,
          data: result,
        });
      })
      .catch((error) => {
        console.error(error);
        next(error);
      });
  };

  protected abstract doCall(args: {
    req: Request;
    res: Response;
  }): PromiseB<any>;
}
