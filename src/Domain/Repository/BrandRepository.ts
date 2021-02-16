import { Brand, PrismaClient, Prisma } from "@prisma/client";
import PromiseB from "bluebird";
import { RejectOnNotFound } from "../Error/RejectOnNotFound";
import { BrandDTO } from "../DTO/BrandDTO";
import { BrandToBrandDTO } from "../Adapter/BrandToBrandDTO";
import { EventManager } from "../Event/EventManager";

export const EVENT_ORM_BRAND_CREATE = "EVENT:ORM:BRAND:CREATE";

export class BrandRepository {
  private readonly _adapter: PrismaClient;

  get adapter(): PrismaClient {
    return this._adapter;
  }

  constructor(args: { adapter: PrismaClient }) {
    this._adapter = args.adapter;
  }

  public loadById(id: string): PromiseB<BrandDTO> {
    return PromiseB.try(() => {
      return this.adapter.brand
        .findUnique({
          where: {
            id: id,
          },
        })
        .then((brand: Brand | null) => {
          if (brand === null) {
            throw new RejectOnNotFound();
          }
          return new BrandToBrandDTO().execute(brand);
        });
    });
  }

  public create(input: { name: string }): PromiseB<BrandDTO> {
    return PromiseB.try(() => {
      return this.adapter.brand.create({
        data: {
          name: input.name,
        },
      });
    })
      .then((brand: Brand) => {
        return new BrandToBrandDTO().execute(brand);
      })
      .then((brand: BrandDTO) => {
        //EMITIR
        EventManager.getInstance().emit({
          eventDTO: {
            eventId: EVENT_ORM_BRAND_CREATE,
            payload: { before: null, after: brand },
            ts_ms: Date.now(),
          },
        });
        return brand;
      });
  }

  public read(args: Prisma.BrandFindManyArgs): PromiseB<BrandDTO[]> {
    return PromiseB.try(() => {
      return this.adapter.brand.findMany({ ...args });
    }).then((brands: Brand[]) => {
      return brands;
    });
  }
}
