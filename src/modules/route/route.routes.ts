import { Router } from "express";
import { validate } from "../../middlewares/zod-validator";
import { RouteController } from "./route.controller";
import { createRouteDto } from "./dto/create.dto";
import { updateRouteDto } from "./dto/update.dto";
import { accessValidator } from "../../middlewares/access-validator";
import { accessProfileEnum } from "../../enumerators/accessProfile";

const router = Router();

router.get(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  RouteController.getRoute
);
router.get(
  "/",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  RouteController.getAllRoute
);
router.post(
  "/",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(createRouteDto),
  RouteController.createRoute
);
router.patch(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(updateRouteDto),
  RouteController.updateRoute
);
router.delete(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  RouteController.deleteRoute
);

export const RouteRoute = { router };
