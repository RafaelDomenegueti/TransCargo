import { Router } from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { jwtValidator } from '../middlewares/jwt-validator';
import { TruckRoute } from '../modules/truck/truck.routes';

const router = Router();

router.use('/auth', AuthRoute.router);
router.use('/truck', jwtValidator, TruckRoute.router);

export { router };
