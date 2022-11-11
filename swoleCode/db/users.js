const { client } = require('./index');

async function createUser( {username, password }) {
    //EZ wokring
   try {
    const result = await client.query(`
        INSERT INTO users ( username, password)
        VALUES($1, $2)
        RETURNING *;
    `, [username, password])
   } catch (error) {
    console.log(error)
   }
}


async function getUser ({ username, password}){
    // this should be able to verify the password against the hashed password
    try {
       const result = await client.query(`
        
       `)
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(userId){
    //working
try {
    const user = await client.query(`
        SELECT id, username
        FROM users
        WHERE id=${ userId };
    `)
    return user
} catch (error) {
    console.log(error)
}
}

async function getUserByUsername(userName){
    //working
    const user = await client.query(`
        SELECT username
        FROM users
        WHERE username=$1;
    `, [userName])
    return user
}

module.exports = {
    createUser,
    getUser,
    getUserById,
    getUserByUsername
}