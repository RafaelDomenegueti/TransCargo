import { z } from "zod";

const updateLoadDto = z.object({
  type_loads: z.enum(["GRANEL", "FRIGORIFICO", "CARGA_VIVA", "CONTEINERES", "PERIGOSAS", "SECAS", "INDIVISIVEIS", "FRAGEIS", "VEICULOS", "MINERIOS"]).optional(),
  weight: z.number().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  origin: z.object({
    city: z.string().max(255).optional(),
    neighborhood: z.string().max(255).optional(),
    number: z.string().max(255).optional(),
    state: z.string().max(255).optional(),
    street: z.string().max(255).optional(),
    zipcode: z.string().max(255).optional(),
    details: z.string().max(255).optional()
  }).optional(),
  destination: z.object({
    city: z.string().max(255).optional(),
    neighborhood: z.string().max(255).optional(),
    number: z.string().max(255).optional(),
    state: z.string().max(255).optional(),
    street: z.string().max(255).optional(),
    zipcode: z.string().max(255).optional(),
    details: z.string().max(255).optional()
  }).optional()
});

export { updateLoadDto }
