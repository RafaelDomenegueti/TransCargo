import Express from 'express';
import { AuthService } from './auth.service';

const login = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await AuthService.login(req.body);

    res.json(response);
  } catch (error) {
    throw error;
  }
}

const register = async (req: Express.Request, res: Express.Response) => {
  try {
    const response = await AuthService.register(req.body);

    res.json(response);
  } catch (error) {
    throw error;
  }
}


export const AuthController = {
  login,
  register
}