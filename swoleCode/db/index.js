// This is where we will be building pg.Client instance

const pg = require('pg');

const  client  = new pg.Client({
    host:process.env.DB_HOSTNAME || 'localhost',
    port: process.env.DB_PORT||5432,
    database: process.env.DB_NAME || 'fitness-dev',
    username: process.env.DB_USERNAME || undefined,
    password: process.env.DB_PASSWORD || undefined,
    connectionString: process.env.DB_URL || 'postgres://localhost:5432/fitness-dev',
    ssl: process.env.NODE_ENV === 'production' ? {rejectUnauthorized: false} : undefined
})


module.exports = {
    client
}
