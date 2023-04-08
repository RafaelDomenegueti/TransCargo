import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validate } from "../../middlewares/zod-validator";
import { loginDto } from "./dto/login.dto";
import { registerDto } from "./dto/register.dto ";
import { jwtValidator } from "../../middlewares/jwt-validator";
import { accessValidator } from "../../middlewares/access-validator";
import { accessProfileEnum } from "../../enumerators/accessProfile";

const router = Router();

router.post("/login", validate(loginDto), AuthController.login);
router.post(
  "/register",
  jwtValidator,
  accessValidator([accessProfileEnum.ADMINISTRADOR]),
  validate(registerDto),
  AuthController.register
);

export const AuthRoute = { router };
