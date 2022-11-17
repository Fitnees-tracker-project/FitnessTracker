const express = require('express'); 
const activitiesRouter = express.Router();
const jwt = require ('jsonwebtoken');
const { getAllActivities, getPublicRoutinesByActivity } = require('../db/activities');
const { requireUser } = require("../API/utils"); 
const { createActivity, updateActivity} = require ('../db/activities')

//GET /activities 
activitiesRouter.get('/', async (req, res, next) => {
try {
    const activities = await getAllActivities();
    res.send({ 
        activities 
    })
} catch (error) {
    console.log("error in getting all activities")
}
}); 

//POST /activities 
activitiesRouter.post('/', async (req,res) => {
    //work on sign ins later
    const { name, description } = req.body
    const postData = {}
    try{
        //postData.creatorId = req.user.id
        postData.name = name
        postData.description = description
    const post = await createActivity(postData)
    if(post){
        res.send({post})
    }else{
        res.send({
            name: "failedToCreatePostActivityError",
            message: "Dam"
        })
        }
    } catch (error) {
        console.log(error)
    }
});

//PATCH /activities/:activityId
//activitiesRouter.patch('/:routineId', async (req, res, ))

//GET /activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    const { activityId } = req.params
    console.log(activityId)
    try {
      const routines = await getPublicRoutinesByActivity(activity);
    res.send(routines);

    } catch (error) {
      console.log(error)
    }
  });

  module.exports = activitiesRouter;


