import { z } from "zod";
import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { createTruckDto } from "./dto/create.dto";
import { updateTruckDto } from "./dto/update.dto";

const createTruck = async (dto: z.infer<typeof createTruckDto>) => {
  const { license_plate, model, qtd_axle, year } = dto;
  
  const truckCreated = await prisma.truck.create({
    data: {
      license_plate,
      model,
      qtd_axle,
      year
    }
  });

  return truckCreated;
}

const getTruck = async (id: string) => {
  const truck = await prisma.truck.findFirst({
    where: {
      id,
    }
  })

  return truck;
}

const getAllTrucks = async (page: number, perPage: number) => {
  const trucks = await prisma.truck.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const total = await prisma.truck.count()

  return {
    total,
    page,
    pageSize: perPage,
    data: trucks
  };
}

const updateTruck = async (dto: z.infer<typeof updateTruckDto>, id: string) => {
  const { license_plate, model, qtd_axle, year } = dto;
  
  const truckCreated = await prisma.truck.update({
    where: {
      id,
    },
    data: {
      license_plate,
      model,
      qtd_axle,
      year
    }
  });

  return truckCreated;
}

const deleteTruck = async (id: string) => {
  const truckDeleted = await prisma.truck.update({
    where: {
      id
    },
    data: {
      deleted_at: new Date(),
    }
  });

  return truckDeleted;
}

export const TruckService = {
  createTruck,
  getTruck,
  updateTruck,
  deleteTruck,
  getAllTrucks,
};
