import mysql from "mysql2/promise";
import dotenv from "dotenv";
import {PrismaClient} from '@prisma/client';


dotenv.config();

export const prisma = new PrismaClient();

export const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    port: process.env.DB_PORT || 3306,
    database: process.env.DB_NAME || "bemine",
    password: process.env.DB_PASSWORD || "12345678",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
