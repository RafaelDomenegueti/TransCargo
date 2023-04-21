import { z } from "zod";

const updateStatusRouteDto = z.object({
  route_id: z.string().uuid(),
  location: z.object({
    city: z.string().max(255),
    neighborhood: z.string().max(255),
    number: z.string().max(255),
    state: z.string().max(255),
    street: z.string().max(255),
    zipcode: z.string().max(255),
    details: z.string().max(255).optional()
  }),
  time: z.string().datetime({ offset: true })
});

export { updateStatusRouteDto }
