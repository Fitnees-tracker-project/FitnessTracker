const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserByUsername, createUser } = require('../db/users')
const { JWT_SECRET } = process.env
const bcrypt = require('bcrypt')

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
    const {rows: [user]} = await getUserByUsername(username)
    //const passwrd = bcrpy.verify()

    // console.log(rPassword)
    if(user && user.password == password){
        const token = jwt.sign( {id: user.id, username: user.username}, JWT_SECRET)
        res.send({message: 'You are logged in', token:token})
    } else{
        next({
            name: "InccorectInfo",
            message: "Username or password is wrong"
        })
    }
   } catch (error) {
        console.log(error)
   }
})


//POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
    const { username, password } = req.body
    try {
        const user = await getUserByUsername(username)

        if(user){
            next({
                name: "userExiststError",
                message: "A user with that name already exists."
            })
        }

        const newUser = await createUser({
            username,
            password
        })

        const token = jwt.sign({
            id: newUser.id,
            username
        }, JWT_SECRET)
        res.send({
            message: 'Welcome to your new account',
            token
        })

    } catch (error) {
        console.log(error)
    }
})

//GET /api/users/me
usersRouter.get('/me', async (req, res, next) => {
    res.send('WElcome to your account!')
})


// GET /api/users/:username/routines
usersRouter.get('/:username/routines', async (req, res, next) => {
    const username = req.params
    console.log('this is username', username)
    try {
        res.send({
            message: 'This is filler for now'
        })
    } catch (error) {
        console.log(error)
    }
})

module.exports = usersRouter;