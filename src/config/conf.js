import { config } from "dotenv";

config();

const dotEnv = {
  port: process.env.PORT,
  MONGODB_URI_DEV: process.env.MONGODB_URI_DEV,
  dev_env: process.env.DEV_ENV,
  DB_NAME: process.env.DB_NAME,
  JWT_SECRET: process.env.JWT_SECRET,
};

export default dotEnv;
