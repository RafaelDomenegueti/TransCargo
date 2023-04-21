import { z } from "zod";

const updateRouteDto = z.object({
  truck_id: z.string().uuid().optional(),
  estimate: z.number().optional(),
  origin: z
    .object({
      city: z.string().max(255).optional(),
      neighborhood: z.string().max(255).optional(),
      number: z.string().max(255).optional(),
      state: z.string().max(255).optional(),
      street: z.string().max(255).optional(),
      zipcode: z.string().max(255).optional(),
      details: z.string().max(255).optional(),
    })
    .optional(),
  destination: z
    .object({
      city: z.string().max(255).optional(),
      neighborhood: z.string().max(255).optional(),
      number: z.string().max(255).optional(),
      state: z.string().max(255).optional(),
      street: z.string().max(255).optional(),
      zipcode: z.string().max(255).optional(),
      details: z.string().max(255).optional(),
    })
    .optional(),
  pitstop: z
    .array(
      z
        .object({
          time: z.string().datetime(),
          location: z.object({
            city: z.string().max(255),
            neighborhood: z.string().max(255),
            number: z.string().max(255),
            state: z.string().max(255),
            street: z.string().max(255),
            zipcode: z.string().max(255),
            details: z.string().max(255).optional(),
          }),
        })
        .optional()
    )
    .optional(),
});

export { updateRouteDto };
