import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: './js/.env' });

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: "postgresql",
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    }
);

export default sequelize;

