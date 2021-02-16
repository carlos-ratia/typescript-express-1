import { ActionBase } from "../../ActionBase";
import { Request, Response } from "express";
import PromiseB from "bluebird";
import { BrandRepository } from "../../../../Domain/Repository/BrandRepository";
import { DBManager } from "../../../../Infrastructure/DBManager";
import { BrandDTO } from "../../../../Domain/DTO/BrandDTO";

export class Read extends ActionBase {
  protected doCall(_args: {
    req: Request;
    res: Response;
  }): PromiseB<BrandDTO[]> {
    return PromiseB.try(() => {
      return new BrandRepository({
        adapter: DBManager.getInstance(),
      }).read({});
    })
      .then((brands: BrandDTO[]) => {
        return brands;
      })
      .catch((error) => {
        throw error;
      });
  }
}
