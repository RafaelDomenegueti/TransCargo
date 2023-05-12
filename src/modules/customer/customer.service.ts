import { z } from "zod";
import { prisma } from "../../prisma/client";
import { findCustomerDto } from "./dto/find.dto";

const findCustomer = async (dto: z.infer<typeof findCustomerDto>) => {
  const { name } = dto;

  const users = await prisma.users.findFirst({
    where: {
      name,
    },
  })

  return users;
}

const getAllLoads = async (email: string) => {
  const loads = await prisma.loads.findMany({
    where: {
      customer: {
        email
      }
    }
  });

  return loads;
}

export const CustomerService = {
  findCustomer,
  getAllLoads,
};
