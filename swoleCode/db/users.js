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

}

async function getUserById(userId){

}

async function getUserByUsername(userName){
    
}

module.exports = {
    createUser
}