import { Router } from "express";
import { validate } from "../../middlewares/zod-validator";
import { LoadController } from "./load.controller";
import { createLoadDto } from "./dto/create.dto";
import { updateLoadDto } from "./dto/update.dto";
import { accessValidator } from "../../middlewares/access-validator";
import { accessProfileEnum } from "../../enumerators/accessProfile";

const router = Router();

router.get(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR, accessProfileEnum.MOTORISTA]),
  LoadController.getLoad
);
router.get(
  "/",
  accessValidator([accessProfileEnum.ADMINISTRADOR, accessProfileEnum.MOTORISTA]),
  LoadController.getAllLoad
);
router.post(
  "/",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(createLoadDto),
  LoadController.createLoad
);
router.patch(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(updateLoadDto),
  LoadController.updateLoad
);
router.delete(
  "/:id",
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  LoadController.deleteLoad
);

export const LoadRoute = { router };
