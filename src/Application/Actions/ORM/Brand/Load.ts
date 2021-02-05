import { ActionBase } from "../../ActionBase";
import { Request, Response } from "express";
import PromiseB from "bluebird";
import { PrismaClient, Brand } from "@prisma/client";

export class Load extends ActionBase {
  protected doCall(args: { req: Request; res: Response }): PromiseB<any> {
    return PromiseB.try(() => {
      const { id } = args.req.params;
      return id ?? "";
    })
      .then((id: string) => {
        //TODO:
        const db = new PrismaClient();
        return db.brand.findUnique({
          where: {
            id: id,
          },
        });
      })
      .then((brand: Brand | null) => {
        console.dir(brand);
        return brand;
      });
  }
}
