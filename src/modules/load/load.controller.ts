import Express from 'express';
import { LoadService } from './load.service';

const createLoad = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await LoadService.createLoad(req.body);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const getAllLoad = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await LoadService.getAllLoads(Number(req.query.page), Number(req.query.perPage));

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const getLoad = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await LoadService.getLoad(req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const updateLoad = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await LoadService.updateLoad(req.body, req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const deleteLoad = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await LoadService.deleteLoad(req.params.id);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

export const LoadController = {
  createLoad,
  getLoad,
  updateLoad,
  deleteLoad,
  getAllLoad
}