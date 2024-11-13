import dotenv from 'dotenv';

dotenv.config();

export const env = {
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  BACKEND_URL: process.env.BACKEND_URL || 'http://localhost:3000',
};