import Express from 'express';
import { RouteService } from './route.service';

const createRoute = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await RouteService.createRoute(req.body);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const getAllRoute = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await RouteService.getAllRoutes(Number(req.query.page), Number(req.query.perPage));

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const getRoute = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await RouteService.getRoute(req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const updateRoute = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await RouteService.updateRoute(req.body, req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const deleteRoute = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await RouteService.deleteRoute(req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

export const RouteController = {
  createRoute,
  getRoute,
  updateRoute,
  deleteRoute,
  getAllRoute
}