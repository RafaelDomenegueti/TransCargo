import { z } from "zod";
import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { createRouteDto } from "./dto/create.dto";
import { updateRouteDto } from "./dto/update.dto";
import { updateStatusRouteDto } from "./dto/update-status.dto";

const createRoute = async (dto: z.infer<typeof createRouteDto>) => {
  const { destination, estimate, origin, truck_id, pitstop } = dto;
  
  const truck = await prisma.truck.findFirst({
    where: {
      id: truck_id,
    }
  })

  if (!truck) {
    throw AppError("Truck not found");
  }

  return await prisma.$transaction(async (tx) => {
    const routeCreated = await tx.routes.create({
      data: {
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
        estimate, 
        truck: {
          connect: {
            id: truck_id
          }
        },
      }
    });

    pitstop.forEach(async ps => {
      await tx.pitstop.create({
        data: {
          routes: {
            connect: {
              id: routeCreated.id
            }
          },
          time: ps.time,
          location: {
            create: {
              city: ps.location.city,
              neighborhood: ps.location.neighborhood,
              number: ps.location.number,
              state: ps.location.state,
              street: ps.location.street,
              zipcode: ps.location.zipcode,
              details: ps.location.details
            }
          }
        }
      })
    });

    return routeCreated
  })
}

const updateRouteStatus = async (dto: z.infer<typeof updateStatusRouteDto>) => {
  const { location, route_id, time } = dto;
  
  const route = await prisma.routes.findFirst({
    where: {
      id: route_id,
    }
  })

  if (!route) {
    throw AppError("Route not found");
  }

  const routeStatus = await prisma.statusRoute.create({
    data: {
      time,
      routes: {
        connect: {
          id: route_id
        }
      },
      location: {
        create: {
          city: location.city,
          neighborhood: location.neighborhood,
          number: location.number,
          state: location.state,
          street: location.street,
          zipcode: location.zipcode,
          details: location.details
        }
      }, 
    }
  });

  return routeStatus;
}

const getRoute = async (id: string) => {
  const route = await prisma.routes.findFirst({
    where: {
      id,
    },
    include: {
      statusRoute: true,
      pitstop: true,
      destination: true,
      origin: true,
      truck: true,
      loadsRoutes: {
        include: {
          load: true,
        }
      }
    }
  })

  return route;
}

const getAllRoutes = async (page: number, perPage: number) => {
  const routes = await prisma.routes.findMany({
    take: perPage,
    skip: (page - 1) * perPage,
  });

  const total = await prisma.routes.count()

  return {
    total,
    page,
    pageSize: perPage,
    data: routes
  };
}

const updateRoute = async (dto: z.infer<typeof updateRouteDto>, id: string) => {
  const { destination, estimate, origin, truck_id, pitstop } = dto;
  
  if (truck_id) {
    const truck = await prisma.truck.findFirst({
      where: {
        id: truck_id,
      }
    })
  
    if (!truck) {
      throw AppError("Truck not found");
    }
  }

  return await prisma.$transaction(async (tx) => {
    const routeCreated = await prisma.routes.update({
      where: {
        id,
      },
      data: {
        destination: {
          update: {
            city: destination?.city || undefined,
            neighborhood: destination?.neighborhood || undefined,
            number: destination?.number || undefined,
            state: destination?.state || undefined,
            street: destination?.street || undefined,
            zipcode: destination?.zipcode || undefined,
            details: destination?.details || undefined,
          }
        }, 
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
        estimate, 
        truck: {
          connect: {
            id: truck_id
          }
        }
      }
    });

    if (pitstop) {
      await tx.pitstop.updateMany({
        where: {
          id
        },
        data: {
          deleted_at: new Date()
        }
      })

      pitstop.forEach(async ps => {
        await tx.pitstop.create({
          data: {
            routes: {
              connect: {
                id: routeCreated.id
              }
            },
            time: ps.time,
            location: {
              create: {
                city: ps.location.city,
                neighborhood: ps.location.neighborhood,
                number: ps.location.number,
                state: ps.location.state,
                street: ps.location.street,
                zipcode: ps.location.zipcode,
                details: ps.location.details
              }
            }
          }
        })
      });
    }

    return routeCreated
  })
}

const deleteRoute = async (id: string) => {
  const routeDeleted = await prisma.routes.update({
    where: {
      id
    },
    data: {
      deleted_at: new Date(),
    }
  });

  return routeDeleted;
}

export const RouteService = {
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute,
  getAllRoutes,
  updateRouteStatus
};
