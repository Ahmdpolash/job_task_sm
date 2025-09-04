import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  db_uri: process.env.DB_URI,
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refresh_secret: process.env.JWT_REFRESH_SECRET,
    refresh_expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  },
  emailSender: {
    email: process.env.EMAIL,
    app_password: process.env.APP_PASSWORD,
    hostName: process.env.HOST,
    port: process.env.PORT,
  },
};

