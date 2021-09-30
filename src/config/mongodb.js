import { MongoClient } from 'mongodb'
import { env } from '*/config/environment.js'


const uri = env.MONGODB_URI

let dbInstance = null

export const connectDB = async () => {

    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    await client.connect()

    // Assign clientDB to our dbInstance
    dbInstance = client.db(env.DATABASE_NAME)
}

// get database instance
export const getDB = () => {
    if (!dbInstance) throw new Error('Must connect to database first')
    return dbInstance
}


// const listDataBase = async (client) => {
//     const databasesList = await client.db().admin().listDatabases()
//     console.log(databasesList)
//     console.log('Your database:')
//     databasesList.databases.forEach(db => console.log(`- ${db.name}`))
// }