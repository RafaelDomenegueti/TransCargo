import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  PRIVATE_KEY: process.env.PRIVATE_KEY,
}