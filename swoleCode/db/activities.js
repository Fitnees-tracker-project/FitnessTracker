const client = require("./client")

async function getAllActivities() {
    try {
        const { row: activites } = await client.query(`
        SELECT *
        FROM activities 
`);
        return activites;
    } catch (error) {
        console.log("Error on getting activities")
        throw error;
    }
}

async function getActivityById(activityId) {
    try{
        const { rows: [activity] } = await client.query(`
        SELECT *
        FROM activities 
        WHERE id=$1
        `, [activityId]);

        return activity;
    } catch (error){
        console.log("Error on getting activity by Id")
        throw error;
    }
}

async function createActivity({ name, description }) {
    try {
        const { rows: [activity] } = await client.query(`
        INSEERT INTO activities(name, description)
        VALUES($1, $2)
        ON CONFLICT(name) DO NOTHING
        RETURNING *
        `, [name, description]);

        return activity; 
    } catch (error) {
        console.log("Error creating activity")
        throw error;
    }
}

async function updateActivity ({ id, name, description }) 

module.exports = {
    getAllActivities,
    getActivityById,
    createActivity, 
    updateActivity 
}