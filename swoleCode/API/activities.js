const express = require('express'); 
const activitiesRouter = express.Router();
const { createActivity, updateActivity, getAllActivities, getPublicRoutinesByActivity } = require("../db");
const { post } = require('./users');
const { requireUser } = require("./utilities"); 

//GET /activities 
activitiesRouter.get('/', async (req, res) => {
    const activities = await getAllActivities();
    res.send({ 
        activities 
    });
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
activitiesRouter.patch('/:routineId', async (req, res, ))

//GET /activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    try {
        const id = req.params.activityId;
        const activity = { id: id };
      const routines = await getPublicRoutinesByActivity(activity);
      if (routines.length === 0)
        res.send({
          message: `Activity ${id} not found`,
          name: 'ActivityDoesNotExistError',
          error: 'Activity does not exist',
        });
      res.send(routines);
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  module.exports = activitiesRouter;


