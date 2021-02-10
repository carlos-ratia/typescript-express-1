import { Brand } from "@prisma/client";
import PromiseB from "bluebird";
import { RejectOnNotFound } from "../Error/RejectOnNotFound";
import { DBManager } from "../../Infrastructure/DBManager";

export class BrandRepository {
  public loadById(id: string): PromiseB<Brand> {
    const db = DBManager.getInstance();
    return PromiseB.try(() => {
      return db.brand
        .findUnique({
          where: {
            id: id,
          },
        })
        .then((brand: Brand | null) => {
          if (brand === null) {
            throw new RejectOnNotFound();
          }
          return brand;
        });
    });
  }

  public create(input: { name: string }): PromiseB<Brand> {
    const db = DBManager.getInstance();
    return PromiseB.try(() => {
      return db.brand.create({
        data: {
          name: input.name,
        },
      });
    }).then((brand: Brand) => {
      return brand;
    });
  }
}
