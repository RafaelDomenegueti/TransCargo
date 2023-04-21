import { z } from "zod";

const createLoadDto = z.object({
  type_loads: z.enum(["GRANEL", "FRIGORIFICO", "CARGA_VIVA", "CONTEINERES", "PERIGOSAS", "SECAS", "INDIVISIVEIS", "FRAGEIS", "VEICULOS", "MINERIOS"]),
  weight: z.number(),
  width: z.number(),
  height: z.number(),
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

export { createLoadDto }
