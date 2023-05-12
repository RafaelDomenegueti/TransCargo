import Express from 'express';
import { CustomerService } from './customer.service';

const getAllLoads = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await CustomerService.getAllLoads(res.locals.user);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const findCustomer = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await CustomerService.findCustomer(req.body);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

export const CustomerController = {
  getAllLoads,
  findCustomer,
}