const { client } = require('./index')

async function getRoutineById(id){
    // working
    try {
        const {rows: [user]} = await client.query(`
            SELECT id, name, goal
            FROM routines
            WHERE id=${id}
        `)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getRoutinesWithoutActivities(){

}

async function getAllRoutines() {

}

async function getAllRoutinesByUser({username}) {

}

async function getPublicRoutinesByUser({username}) {

}

async function getAllPublicRoutines() {

}
async function getPublicRoutinesByActivity({id}) {
    try {
        
    } catch (error) {
        console.log(error)
    }
}

async function createRoutine({creatorId, isPublic, name, goal}) {
    try {
        const result = await client.query(`
            INSERT INTO routines (creatorId, isPublic, name, goal)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [creatorId, isPublic, name, goal])
        return result
    } catch (error) {
        console.log(error)
    }
}

async function updateRoutine({id, ...fields}) {

}

async function destroyRoutine(id) {

}


module.exports = {
    createRoutine,
    getRoutineById
}