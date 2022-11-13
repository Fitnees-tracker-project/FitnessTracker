const express = require('express');
const apiRouter = express.Router();

const usersRouter = require('./users')








apiRouter.use('/users', usersRouter)

apiRouter.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    })
})

module.exports = apiRouter;