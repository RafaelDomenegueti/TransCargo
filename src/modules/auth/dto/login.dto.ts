import { z } from "zod";

const loginDto = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

export { loginDto }