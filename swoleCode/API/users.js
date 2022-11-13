const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername } = require('../db/users')

usersRouter.use((req, res, next) => {
    console.log('a request is being made to /users!')
    next();
})

// Test Route
usersRouter.get('/', (req, res, next) => {
    res.send({
        message: 'welcome'
    })
})

//POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
   const {username, password} = req.body;
   if(!username || !password){
    next({
        name: 'MissingInfoError',
        message: 'Need both a username and password'
    })
   }
   try {
    const user = await getUserByUsername(username)
    if(user && req.body.password == password){
        const token = jwt.sign( {id: user.id, username: user.username}, process.env.JWT_SECRET)
        res.send({message: 'You are logged in', token:token})
    } else{
        console.log('this is req body', req.body)
        console.log('incorect code L')
        console.log(req.body.password)
    }
   } catch (error) {
        console.log(error)
   }
})

//POST /api/users/register

//GET /api/users/me

// GET /api/users/:username/routines


module.exports = usersRouter;