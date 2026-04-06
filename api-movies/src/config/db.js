import mysql from 'mysql2/promise';
// import dotenv from 'dotenv'
import { loadEnvFile } from 'node:process'

if (!process.env.DB_HOST) {
    // dotenv.config()
    loadEnvFile()
}

// Create the connection pool. The pool-specific settings are the defaults
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,

    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    namedPlaceholders: true
});

