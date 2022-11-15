const { client } = require('./index')
const { createUser, getUser, getUserById, getUserByUsername } = require('./users')
const { createRoutine, getRoutineById, getRoutine, getAllRoutinesByUser, getAllPublicRoutines, destroyRoutine, getPublicRoutinesByUser } = require('./routines')

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

    await createRoutine({
      creatorId: John31.id,
      isPublic: true,
      name: "Bench Press",
      goal: "Chest growth"
    })
  } catch (error) {
    console.log(error)
  }
}

async function testCompare(){
  console.log('Comparing hashed password to password input')
  const result = await getUser({username: "DanielW677", password: "P@ssW0rd"})
  console.log('Finished comparing here is result', result)
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

async function getRoutines(){
  console.log('starting to get routine without activity')
  const result = await getRoutine()
  console.log('finished getting routine without activity')
  console.log(result)
}

async function routineByUser(){
  try {
    console.log('starting to get get routines by user')

    const result = await getAllRoutinesByUser(1)

    console.log('finished getting routines by user')

    console.log('these are the routines', result)
  } catch (error) {
    console.log(error)
  }
}
async function pubRoutinesByUser(){
  try {
    console.log('starting to get all pub routines by user')
    const result = await getPublicRoutinesByUser(2)
    console.log('Finished getting pub routiens by user', result)
  } catch (error) {
    console.log(error)
  }
}

async function allPubRoutines(){
  try {
    console.log('starting to get all pub routines')
    const result = await getAllPublicRoutines()
    console.log('done getting all pub routiens')
    console.log('this is result', result)
  } catch (error) {
    console.log(error)
  }
}

async function deleteRoutine(){
  try {
    console.log('Starting to delete row')
    await destroyRoutine(1)
    console.log('Deleted routine')
    const result = await getAllPublicRoutines();
    console.log(result)
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
        // await GetUserByUser();
        // await userById();
        // await testCompare();
        await createRoutines();
        // await routineById();
        // await getRoutines();
        // await routineByUser();
        // await allPubRoutines()
        // await pubRoutinesByUser();
        // await deleteRoutine();
    } catch (error) {
        console.log('error building db')
    }
}

rebuildDB()
  .catch(console.error)
  .finally(() => client.end())