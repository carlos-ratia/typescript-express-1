import { ActionBase } from "../../ActionBase";
import { Request, Response } from "express";
import PromiseB from "bluebird";
import { BrandRepository } from "../../../../Domain/Repository/BrandRepository";
import { DBManager } from "../../../../Infrastructure/DBManager";
import { BrandDTO } from "../../../../Domain/DTO/BrandDTO";

export class Create extends ActionBase {
  protected doCall(args: { req: Request; res: Response }): PromiseB<BrandDTO> {
    return PromiseB.try(() => {
      const { name } = args.req.body;
      return name;
    })
      .then((name: string) => {
        return new BrandRepository({
          adapter: DBManager.getInstance(),
        }).create({ name });
      })
      .then((brand: BrandDTO) => {
        return brand;
      })
      .catch((error) => {
        throw error;
      });
  }
}
