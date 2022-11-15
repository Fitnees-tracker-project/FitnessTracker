const express = require('express');
const routinesRouter = express.Router();
const jwt = require('jsonwebtoken');


routinesRouter.use((req, res, next) => {
    console.log('A request is being made to /routines')
    next()
})

//TEST ROUTE
routinesRouter.get('/', (req, res, next) => {
    res.send({
        message: "Welcome to /routines :D"
    })
})


// GET /routines
routinesRouter.get('/routines', async (req, res, next) => {
    res.send({
        message: "Routines"
    })
})
// POST /routines *
routinesRouter.post('/routines', async (req, res) => {
    res.send({
        message: 'Routines'
    })
})
// PATCH /routines/:routineId
routinesRouter.patch('/routines/:routineId', async (req, res, next) => {
    res.send({
        message: 'Message'
    })
})
//DELETE /routines/:routineId
routinesRouter.delete('/routines/:routineId', async (req, res, next) => {
    res.send({
        message: "message"
    })
})
// POST /routines/:routineId/activities
routinesRouter.post('/routines/:routineId/activities', async (req, res, next) => {
    res.send({
        message: 'message'
    })
})
// PATCH /routine_activities/:routineActivityId
routinesRouter.patch('/routine_activities/:routineActivityId', async (req, res, next) => {
    res.send({
        message: 'New message'
    })
})
// DELETE /routine_activities/:routineActivityId
routinesRouter.delete('/routine_activitys/:routineActivityId', async (req, res, next) => {
    res.send({
        message: 'new message'
    })
})

module.exports = routinesRouter;