const express = require('express'); 
const router = express.Router(); 
const {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity
} = require ("../db"); 

//PATCH /routineactivities/:routineActivityId 
addActivityToRoutine.patch('/:routineActivityId', async (req, res, next) => {
    const { routineActivityId } = req.params
    const { count, duration } = req.body
    console.log('this is routineActivityId', routineActivityId)
try {
    const updatedRoutineActivity = await updateRoutineActivity ({id: count, duration})
    console.log(updatedRoutineActivity)
    res.send({ routineActivityId })
    } catch (error) {
        console.error(error.detail)
    }
})

