import { z } from "zod";

const createRouteDto = z.object({
  estimate: z.number(),
  truck_id: z.string().uuid(),
  origin: z.object({
    city: z.string().max(255),
    neighborhood: z.string().max(255),
    number: z.string().max(255),
    state: z.string().max(255),
    street: z.string().max(255),
    zipcode: z.string().max(255),
    details: z.string().max(255).optional()
  }),
  destination: z.object({
    city: z.string().max(255),
    neighborhood: z.string().max(255),
    number: z.string().max(255),
    state: z.string().max(255),
    street: z.string().max(255),
    zipcode: z.string().max(255),
    details: z.string().max(255).optional()
  })
});

export { createRouteDto }
