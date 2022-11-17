const { client } = require ('./index')

async function getRoutineActivityById(id) {
    try {
        const { rows: [routine_activity] } = await client.query(`
        SELECT *
        FROM routine_activities
        WHERE id = $1;
        `, [id]);

        return routine_activity;
    } catch (error) {
        console.log("test error" + error)
        throw error; 
    }
}

async function addActivityToRoutine ({ 
    routineId, 
    activityId, 
    count, 
    duration}) {
    try {
        const { rows: [routine_activity] } = await client.query (`
        INSERT INTO routine_activities ("routineId", "activityId", count, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [routineId, activityId, count, duration]);
        
        return routine_activity; 
    }catch (error){
        console.log("error in addActivityToRoutine")
    }
}

async function updateRoutineActivity({ id, count, duration }){
    try {
        const result = await client.query(`
        UPDATE routineactivity 
        SET count= $1,
            duration= $2
        WHERE id=${id}
        RETURNING *; 
        `, [count, duration])
        return result
    } catch (error) {
        console.log("error in updating routine activity")
    }
}

async function destroyRoutineActivity(id) {
    try {
        const { rows: [routine_activity] } = await client.query(`
        DELETE FROM routine_activities
        WHERE id = $1
        RETURNING *
        ` [id]);

        return routine_activity;
    } catch (error) {
        console.log ("Error in destroying routine activity")
        throw error;
    }
}

async function getRoutineActivityByRoutine({ id }) {
    try {
        const { rows: routine_activity } = await client.query(`
        SELECT *
        FROM routine activities
        WHERE "routineId"=$1;
        `, [id]);

        return routine_activity;
    } catch (error) {
        console.log ("Error in getting routine activities by routine")
        throw error;
    }
}

module.exports = {
    getRoutineActivityById,
    addActivityToRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivityByRoutine
}
