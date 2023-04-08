import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/zod-validator';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto ';

const router = Router();

router.post('/login', validate(loginDto), AuthController.login);
router.post('/register', validate(registerDto), AuthController.register);

export const AuthRoute = { router };
