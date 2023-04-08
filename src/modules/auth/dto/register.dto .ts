import { z } from "zod";

const registerDto = z.object({
  email: z.string().email(),
  access_profile_id: z.string().uuid(),
  name: z.string(),
  password: z.string()
});

export { registerDto }