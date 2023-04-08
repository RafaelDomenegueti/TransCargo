import { Router } from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { jwtValidator } from '../middlewares/jwt-validator';

const router = Router();

router.use('/auth', AuthRoute.router);

export { router };
