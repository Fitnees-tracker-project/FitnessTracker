const express = require('express');
const routinesRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getRoutine } = require('../db/routines')
const {requireUser} = require('../API/utils')
const {createRoutine} = require('../db/routines')


routinesRouter.use((req, res, next) => {
    console.log('A request is being made to /routines')
    next()
})

//TEST ROUTE
// routinesRouter.get('/', (req, res, next) => {
//     res.send({
//         message: "Welcome to /routines :D"
//     })
// })


// GET /routines
routinesRouter.get('/', async (req, res, next) => {
    // THIS WILL NEED ACTIVITIES AFTER 
    //WORKING FOR NOW(COME BACK)
    try {
        const routines = await getRoutine();
        res.send({
            routines
        })
    } catch (error) {
        console.log(error)
    }
})
// POST /routines *
routinesRouter.post('/', async (req, res) => {
    // WORKING-- ADD REQUIRES SIGN IN LATER
    const { isPublic, name, goal } = req.body
    const postData = {}
    try {
    //    postData.creatorId = req.user.id
       postData.name = name
       postData.goal = goal
       postData.isPublic = isPublic
       const post = await createRoutine(postData)
       if(post){
        res.send({post})
       }else{
        res.send({
            name: "failedToCreatePostError",
            message: "Get better nerd"
        })
       }
    } catch (error) {
        console.log(error)
    }
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

module.exports = routinesRouter;