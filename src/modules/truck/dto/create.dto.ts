import { z } from "zod";

const createTruckDto = z.object({
  model: z.string().max(40).min(3),
  license_plate: z.string().length(7),
  year: z.string().length(4),
  qtd_axle: z.number()
});

export { createTruckDto }
