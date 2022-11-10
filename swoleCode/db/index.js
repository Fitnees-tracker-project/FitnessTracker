// This is where we will be building pg.Client instance

const pg = require('pg');

const  client  = new pg.Client('postgres://localhost:3000/fitness-dev')


module.exports - {
    client
}