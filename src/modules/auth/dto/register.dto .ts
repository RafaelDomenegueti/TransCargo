import { z } from "zod";

const registerDto = z.object({
  email: z.string().email(),
  access_profile_id: z.string().uuid(),
  name: z.string().max(100).min(3),
  password: z.string().min(8)
});

export { registerDto }