import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

 const sequelize = new Sequelize({
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dialect: 'mysql', // Specify the dialect for MySQL
    port: Number(process.env.DB_PORT),
    logging: false, // Optional: set to true to log SQL queries
});

export default sequelize;