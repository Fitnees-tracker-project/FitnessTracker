const { client } = require('./index')
const { createUser, getUser, getUserById } = require('./users')


 async function dropTables() {
  try {
    console.log('starting to drop tables')
    await client.query(`
      DROP TABLE IF EXISTS routineactivities;
      DROP TABLE IF EXISTS routines;
      DROP TABLE IF EXISTS activities;
      DROP TABLE IF EXISTS users;
    `)
    console.log('finished dropping tables')
  } catch (error) {
    console.log(error)
  }
 }


async function createTables() {
  try {
    console.log('starting to create tables')
    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL
      );
      CREATE TABLE activities (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        description TEXT NOT NULL
      );
      CREATE TABLE routines (
        id SERIAL PRIMARY KEY,
        "creatorId" INTEGER REFERENCES  users(id),
        "isPublic" BOOLEAN DEFAULT false,
        name VARCHAR(255) UNIQUE NOT NULL,
        goal TEXT NOT NULL
      );
      CREATE TABLE routineactivities (
        id SERIAL PRIMARY KEY,
        "routineId" INTEGER REFERENCES routines(id),
        "activityId" INTEGER REFERENCES activities(id),
        duration INTEGER,
        count INTEGER
      );
    `)
    console.log('done creating tables')
  } catch (error) {
    console.log(error)
  }
}


async function createFirstUsers(){
  try {
    console.log('starting to create users...')
    await createUser({
      username: 'DanielW677',
      password: 'P@ssW0rd'
    })
    await createUser({
      username: 'Johnsteven31',
      password: 'totally-legit-password'
    })

    console.log('users created')
  } catch (error) {
    console.log(error)
  }
}

async function getTheUser() {
  try {
    console.log('getting inital users')
   
  } catch (error) {
    console.log(error)
  }
}

async function userById() {
  try {
    console.log('getting user by id')
    const { rows: [ user ]}  = await getUserById(1)
    console.log('finished getting user')
    console.log('user obj ', user )
  } catch (error) {
    console.log(error)
  }
}

async function rebuildDB(){
    try {
      client.connect()
        await dropTables()
        await createTables()
        await createFirstUsers();
        await userById();
        client.end();
    } catch (error) {
        console.log('error building db')
    }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end())