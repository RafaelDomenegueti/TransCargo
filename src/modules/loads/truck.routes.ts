import { Router } from "express";
import { validate } from "../../middlewares/zod-validator";
import { TruckController } from "./truck.controller";
import { createTruckDto } from "./dto/create.dto";
import { updateTruckDto } from "./dto/update.dto";
import { accessValidator } from "../../middlewares/access-validator";
import { accessProfileEnum } from "../../enumerators/accessProfile";

const router = Router();

router.get(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  TruckController.getTruck
);
router.get(
  "/",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  TruckController.getAllTruck
);
router.post(
  "/",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(createTruckDto),
  TruckController.createTruck
);
router.patch(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(updateTruckDto),
  TruckController.updateTruck
);
router.delete(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  TruckController.deleteTruck
);

export const TruckRoute = { router };
