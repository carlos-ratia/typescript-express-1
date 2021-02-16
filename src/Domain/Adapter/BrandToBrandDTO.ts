import { BrandDTO } from "../DTO/BrandDTO";
import { Brand } from "@prisma/client";

export class BrandToBrandDTO {
  constructor() {}

  execute(brand: Brand): BrandDTO {
    return {
      id: brand.id,
      name: brand.name,
    };
  }
}
