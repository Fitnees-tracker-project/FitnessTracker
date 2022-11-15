const express = require('express');
const apiRouter = express.Router();
const { JWT_SECRET } = process.env
const usersRouter = require('./users')
const jwt = require('jsonwebtoken')
const routineRouter = require('./routines')


apiRouter.use('/users', usersRouter)
apiRouter.use('/routines', routineRouter)

apiRouter.use((error, req, res, next) => {
    res.send({
        name: error.name,
        message: error.message
    })
})

module.exports = apiRouter;