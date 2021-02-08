import { ActionBase } from "../../ActionBase";
import { Request, Response } from "express";
import PromiseB from "bluebird";
import { BrandRepository } from "../../../../Domain/Repository/BrandRepository";
import { RejectOnNotFound } from "../../../../Domain/Error/RejectOnNotFound";
import createHttpError from "http-errors";
import { Brand } from "@prisma/client";

export class Load extends ActionBase {
  protected doCall(args: { req: Request; res: Response }): PromiseB<Brand> {
    return PromiseB.try(() => {
      const { id } = args.req.params;
      return id ?? "";
    })
      .then((id: string) => {
        return new BrandRepository().loadById(id);
      })
      .then((brand: Brand) => {
        console.dir(brand);
        return brand;
      })
      .catch((error) => {
        if (error instanceof RejectOnNotFound) {
          throw createHttpError(404);
        }
        throw error;
      });
  }
}
