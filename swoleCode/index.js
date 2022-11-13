const express = require('express');
const { client } = require('./db/index')
const app = express();
const morgan = require('morgan');
require('dotenv').config() 

app.use(express.json());




const apiRouter = require('./API/index')
app.use('/api', apiRouter)
client.connect();

app.listen(3000, () => {
    console.log('we are up and running on port 3000')
});