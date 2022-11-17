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
    routineid, 
    activityid, 
    count, 
    duration}) {
    try {
        const { rows: [routine_activity] } = await client.query (`
        INSERT INTO routineactivities ("routineid", "activityid", count, duration)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `, [routineid, activityid, count, duration]);
        
        return routine_activity; 
    }catch (error){
        console.log("error in addActivityToRoutine")
    }
}

async function updateRoutineActivity({ id, count, duration }){
    
}
//come back to it 

async function destroyRoutineActivity(id) {
    try {
        const result = await client.query(`
        DELETE FROM routineactivities
        WHERE id = ${id}
        `);
        return result;
    } catch (error) {
        console.log ("Error in destroying routine activity")
        throw error;
    }
}

async function getRoutineActivityByRoutine({ id }) {
    try {
        const { rows } = await client.query(`
        SELECT *
        FROM routineactivities
        WHERE "routineid"=${id};
        `,);

        return rows;
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
