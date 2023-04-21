import { z } from "zod";
import { prisma } from "../../prisma/client";
import { createLoadDto } from "./dto/create.dto";
import { updateLoadDto } from "./dto/update.dto";

const createLoad = async (dto: z.infer<typeof createLoadDto>) => {
  const { destination, height, origin, type_loads, weight, width } = dto;
  
  const loadCreated = await prisma.loads.create({
    data: {
      origin: {
        create: {
          city: origin.city,
          neighborhood: origin.neighborhood,
          number: origin.number,
          state: origin.state,
          street: origin.street,
          zipcode: origin.zipcode,
          details: origin.details
        }
      }, 
      destination: {
        create: {
          city: destination.city,
          neighborhood: destination.neighborhood,
          number: destination.number,
          state: destination.state,
          street: destination.street,
          zipcode: destination.zipcode,
          details: destination.details
        }
      }, 
      height, 
      weight, 
      width,
      type_loads
    }
  });

  return loadCreated;
}

const getLoad = async (id: string) => {
  const load = await prisma.loads.findFirst({
    where: {
      id,
    }
  })

  return load;
}

const getAllLoads = async (page: number, perPage: number) => {
  const loads = await prisma.loads.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const total = await prisma.loads.count()

  return {
    total,
    page,
    pageSize: perPage,
    data: loads
  };
}

const updateLoad = async (dto: z.infer<typeof updateLoadDto>, id: string) => {
  const { destination, height, origin, type_loads, weight, width } = dto;
  
  const loadCreated = await prisma.loads.update({
    where: {
      id,
    },
    data: {
      origin: {
        update: {
          city: origin?.city || undefined,
          neighborhood: origin?.neighborhood || undefined,
          number: origin?.number || undefined,
          state: origin?.state || undefined,
          street: origin?.street || undefined,
          zipcode: origin?.zipcode || undefined,
          details: origin?.details || undefined
        }
      }, 
      destination: {
        update: {
          city: destination?.city || undefined,
          neighborhood: destination?.neighborhood || undefined,
          number: destination?.number || undefined,
          state: destination?.state || undefined,
          street: destination?.street || undefined,
          zipcode: destination?.zipcode || undefined,
          details: destination?.details || undefined
        }
      },
      height, 
      type_loads, 
      weight, 
      width
    }
  });

  return loadCreated;
}

const deleteLoad = async (id: string) => {
  const loadDeleted = await prisma.loads.update({
    where: {
      id
    },
    data: {
      deleted_at: new Date(),
    }
  });

  return loadDeleted;
}

export const LoadService = {
  createLoad,
  getLoad,
  updateLoad,
  deleteLoad,
  getAllLoads,
};
