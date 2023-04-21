import { Router } from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { jwtValidator } from '../middlewares/jwt-validator';

// Routes
import { TruckRoute } from '../modules/truck/truck.routes';
import { LoadRoute } from '../modules/load/load.routes';
import { RouteRoute } from '../modules/route/route.routes';

const router = Router();

router.use('/auth', AuthRoute.router);
router.use('/truck', jwtValidator, TruckRoute.router);
router.use('/load', jwtValidator, LoadRoute.router);
router.use('/route', jwtValidator, RouteRoute.router);

export { router };
