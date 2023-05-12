import { z } from "zod";

const findCustomerDto = z.object({
  name: z.string(),
});

export { findCustomerDto }
