const express = require('express'); 
const activitiesRouter = express.Router();
const { createActivity, updateActivity, getAllActivities, getPublicRoutinesByActivity } = require("../db");
const { requireUser } = require("./utilities"); 

//GET /activities 
activitiesRouter.get('/', async (req, res) => {
    const activities = await getAllActivities();
    res.send({ activities }); 
}); 
