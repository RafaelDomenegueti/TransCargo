import Express from 'express';
import { TruckService } from './truck.service';

const createTruck = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await TruckService.createTruck(req.body);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const getAllTruck = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await TruckService.getAllTrucks(Number(req.query.page), Number(req.query.perPage));

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const getTruck = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await TruckService.getTruck(req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const updateTruck = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await TruckService.updateTruck(req.body, req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const deleteTruck = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await TruckService.deleteTruck(req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

export const TruckController = {
  createTruck,
  getTruck,
  updateTruck,
  deleteTruck,
  getAllTruck
}