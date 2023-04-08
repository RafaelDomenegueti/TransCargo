import { z } from "zod";

const updateTruckDto = z.object({
  model: z.string().max(40).min(3).optional(),
  license_plate: z.string().length(7).optional(),
  year: z.string().length(4).optional(),
  qtd_axle: z.number().optional()
});

export { updateTruckDto }
