import { z } from "zod";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { loginDto } from "./dto/login.dto";
import { ENV } from "../../utils/env";
import { prisma } from "../../prisma/client";
import { AppError } from "../../errors/AppError";
import { registerDto } from "./dto/register.dto ";
import { accessProfileEnum } from "../../enumerators/accessProfile";

const login = async (dto: z.infer<typeof loginDto>) => {
  const { email, password } = dto;

  const userByEmail = await prisma.users.findFirst({
    where: {
      email,
    },
  });

  if (!userByEmail) {
    throw AppError("User not found");
  }

  const validation = await bcrypt.compare(password, userByEmail.password);

  if (!validation) {
    throw AppError("Password is incorrect");
  }

  const token = jwt.sign({ email: email }, ENV.PRIVATE_KEY, { expiresIn: '24h' });

  return {
    token,
  };
};

const register = async (dto: z.infer<typeof registerDto>) => {
  const { access_profile_id, email, name, password } = dto;

  const [userByEmail, accessProfile] = await Promise.all([
    prisma.users.findFirst({
      where: {
        email,
      },
    }),
    prisma.accessProfile.findFirst({
      where: {
        id: access_profile_id,
      },
    }),
  ]);

  if (userByEmail) {
    throw AppError("Email has already been used");
  }

  if (!accessProfile) {
    throw AppError("Access profile not found");
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const userCreated = await prisma.users.create({
    data: {
      email,
      name,
      password: encryptedPassword,
      access_profile_id,
    }
  })

  delete userCreated.password

  return {
    ...userCreated,
  };
};

export const AuthService = {
  login,
  register,
};
