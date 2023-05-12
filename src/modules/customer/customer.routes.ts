import { Router } from "express";
import { validate } from "../../middlewares/zod-validator";
import { CustomerController } from "./customer.controller";
import { findCustomerDto } from "./dto/find.dto";
import { accessValidator } from "../../middlewares/access-validator";
import { accessProfileEnum } from "../../enumerators/accessProfile";

const router = Router();

router.get(
  "/loads",
  accessValidator([accessProfileEnum.ADMINISTRADOR, accessProfileEnum.CLIENTE]),
  CustomerController.getAllLoads
);
router.post(
  "/find",
  accessValidator([accessProfileEnum.ADMINISTRADOR, accessProfileEnum.CLIENTE]),
  validate(findCustomerDto),
  CustomerController.findCustomer
);

export const CustomerRoute = { router };
