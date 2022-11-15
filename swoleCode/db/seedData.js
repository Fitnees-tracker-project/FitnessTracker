const { client } = require('./index')
const { createUser, getUser, getUserById, getUserByUsername } = require('./users')
const { createRoutine, getRoutineById } = require('./routines')

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
        "creatorid" INTEGER REFERENCES  users(id),
        "ispublic" BOOLEAN DEFAULT false,
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
      username: 'John31',
      password: 'totally-legit-password'
    })

    console.log('users created')
  } catch (error) {
    console.log(error)
  }
}

async function createRoutines(){
  try {
    const DanielW677 = await getUserByUsername('DanielW677')
    const John31 = await getUserByUsername('John31')
    console.log('Starting to create routines...')
    // console.log('this id me', DanielW677.id)

    await createRoutine({
      creatorId: DanielW677.id,
      isPublic: true,
      name: "Crunches",
      goal: "Abs"
    })

    await createRoutine({
      creatorId: John31.id,
      isPublic: false,
      name: "Dumbell chest press",
      goal: "get massive pecs"
    })
  } catch (error) {
    console.log(error)
  }
}


async function GetUserByUser(){
  try {
    console.log('starting to get user by username')
    const {rows} = await getUserByUsername('John31')
    console.log('finished get user by user')
    console.log('this is get user by user func ', rows ) 
  } catch (error) {
    console.log(error)
  }
}

async function userById() {
  try {
    console.log('getting user by id')
    const { rows: [ user ]}  = await getUserById(1)
    console.log('finished getting user')
    console.log('this is get user by Id func ', user )
  } catch (error) {
    console.log(error)
  }
}

async function routineById(){
  console.log('getting routine by Id')
  const chestPress = await getRoutineById(2)
  console.log('finished getting routine by Id')
  console.log(chestPress)
}

async function rebuildDB(){
    try {
      client.connect()
        await dropTables()
        await createTables()
        await createFirstUsers();
        // await GetUserByUser();
        // await userById();
        await createRoutines();
        await routineById();
    } catch (error) {
        console.log('error building db')
    }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end())