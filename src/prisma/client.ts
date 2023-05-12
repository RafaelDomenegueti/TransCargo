import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    // Change to findFirst - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = 'findFirst'
    // Add 'deleted_at' filter
    // ID filter maintained
    params.args.where['deleted_at'] = false
  }
  if (params.action === 'findMany') {
    // Find many queries
    if (params.args.where) {
      if (params.args.where.deleted_at == undefined) {
        // Exclude deleted_at records if they have not been explicitly requested
        params.args.where['deleted_at'] = false
      }
    } else {
      params.args['where'] = { deleted_at: false }
    }
  }
  return next(params)
})

prisma.$use(async (params, next) => {
  if (params.action == 'update') {
    // Change to updateMany - you cannot filter
    // by anything except ID / unique with findUnique
    params.action = 'updateMany'
    // Add 'deleted_at' filter
    // ID filter maintained
    params.args.where['deleted_at'] = false
  }
  if (params.action == 'updateMany') {
    if (params.args.where != undefined) {
      params.args.where['deleted_at'] = false
    } else {
      params.args['where'] = { deleted_at: false }
    }
  }
  return next(params)
})

prisma.$use(async (params, next) => {
  if (params.action == 'delete') {
    // Delete queries
    // Change action to an update
    params.action = 'update'
    params.args['data'] = { deleted_at: true }
  }
  if (params.action == 'deleteMany') {
    // Delete many queries
    params.action = 'updateMany'
    if (params.args.data != undefined) {
      params.args.data['deleted_at'] = true
    } else {
      params.args['data'] = { deleted_at: true }
    }
  }
  return next(params)
})
