import { ActionBase } from "../../ActionBase";
import { Request, Response } from "express";
import PromiseB from "bluebird";
import { BrandRepository } from "../../../../Domain/Repository/BrandRepository";
import { Brand } from "@prisma/client";

export class Create extends ActionBase {
  protected doCall(args: { req: Request; res: Response }): PromiseB<Brand> {
    return PromiseB.try(() => {
      const { name } = args.req.body;
      return name;
    })
      .then((name: string) => {
        return new BrandRepository().create({name});
      })
      .then((brand: Brand) => {
        console.dir(brand);
        return brand;
      })
      .catch((error) => {
        throw error;
      });
  }
}
