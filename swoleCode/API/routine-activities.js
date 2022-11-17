const express = require('express'); 
const routineActivitiesRouter = express.Router(); 
const {
    getRoutineActivityById,
    getRoutineById,
    updateRoutineActivity,
    destroyRoutineActivity
} = require ("../db"); 
routineActivitiesRouter.use((req, res, next ) => {
    console.log("request being made")
    next()
})
//PATCH /routineactivities/:routineActivityId 
routineActivitiesRouter.patch('/:routineActivityId', async (req, res, next) => {
    const { routineActivityId } = req.params
    const { count, duration } = req.body
    console.log('this is routineActivityId', routineActivityId)
    
try {
    const updatedRoutineActivity = await updateRoutineActivity ({routineActivityId, count, duration})
    console.log(updatedRoutineActivity)
    res.send({ routineActivityId })
    } catch (error) {
        console.error(error.detail)
    }
})

//DELETE /routine_activities/:routineActivityId
routineActivitiesRouter.delete('/:routineActivityId', async (req, res, next) => {
    const { routineActivityId } = req.params
    console.log('this is routineActivityId', routineActivityId)
try {
    const routineActivity = await getRoutineActivityById (routineActivityId);
    const routine = await getRoutineById (routineActivity.routineId);
    
    const destroyActivityFromRoutine = await destroyRoutineActivity (routineActivityId)
res.send(destroyActivityFromRoutine);
//this part might be wrong
} catch (error){
    console.error(error.detail)
}
})

module.exports = routineActivitiesRouter;