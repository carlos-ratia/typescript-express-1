import { PrismaClient, Brand } from "@prisma/client";
import PromiseB from "bluebird";
import { RejectOnNotFound } from "../Error/RejectOnNotFound";

export class BrandRepository {
  public loadById(id: string): PromiseB<Brand> {
    const db = new PrismaClient();
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
    const db = new PrismaClient();
    return PromiseB.try(() => {
      return db.brand.create({
        data: {
          name: input.name,
        },
      });
    })
      .then((brand: Brand) => {
        return brand;
      })
      .then(async (brand: Brand) => {
        // EventManager.dispach(event); -> EVENT
        // DOMINIO (OBSERVER/....)
        // new DBBrand.crate( ) {}('BRAND', 'CREATE', ....).call()
        await db.brandWatchDog.create({
          data: {
            operation: "CREATE",
            payload: {
              input: input,
              result: brand,
            },
            Brand: {
              connect: {
                id: brand.id,
              },
            },
          },
        });
        return brand;
      });
  }
}
