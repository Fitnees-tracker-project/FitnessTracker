const { client } = require('./index')
const { getUserByUsername } = require('./users')

async function getRoutineById(id){
    // working
    try {
        const {rows: [user]} = await client.query(`
            SELECT id, name, goal
            FROM routines
            WHERE id=${id};
        `)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getRoutine(){
    // WOKRING
    const { rows } = await client.query(`
        SELECT *
        FROM routines;
    `)
    return rows
}

async function getAllRoutines() {
    //Not sure what activity is RN - SKIP

}

async function getAllRoutinesByUser({username}) {
    // COME BACK TO
    try {
        const user = await getUserByUsername(username)
       
       const  rows  = await client.query(`
        SELECT *
        FROM routines
        WHERE creatorid=($1)
       `, [user])
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getPublicRoutinesByUser({username}) {

}

async function getAllPublicRoutines() {
    //WORKING
    try {
        const {rows} = await client.query(`
            SELECT *
            FROM routines
            WHERE ispublic=true
        `)
        return rows
    } catch (error) {
        console.log(error)
    }
}

async function getPublicRoutinesByActivity({id}) {
    // COME BACK AFTER ACTIVITYS ARE DONE
    try {
        
    } catch (error) {
        console.log(error)
    }
}

async function createRoutine({creatorId, isPublic, name, goal}) {
    // WORKING
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
    // WORKING
try {
    const result = await client.query(`
        DELETE FROM routines
        WHERE id=${ id }
    `)
} catch (error) {
    console.log(error)
}
}


module.exports = {
    createRoutine,
    getRoutineById,
    getRoutine,
    getAllRoutinesByUser,
    getAllPublicRoutines,
    destroyRoutine
}