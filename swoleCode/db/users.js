const { client } = require('./index');

async function createUser( {username, password }) {
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
    try {
        const user = await client.query(`
            SELECT username, id
            FROM users
            WHERE username=${username};
        `)
        return user
    } catch (error) {
        console.log(error)
    }
}

async function getUserById(userId){
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
    
}

module.exports = {
    createUser,
    getUser,
    getUserById
}