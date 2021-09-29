import { MongoClient } from 'mongodb'
import { env } from '*/config/environment.js'


const uri = env.MONGODB_URI

export const connectDB = async () => {

    const client = new MongoClient(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })

    try {
        await client.connect()
        console.log('Connect to Database successfully')

        await listDataBase(client)
    } finally {
        // Ensure that database is closed when finishing or erroring
        await client.close()
    }
}

const listDataBase = async (client) => {
    const databasesList = await client.db().admin().listDatabases()
    console.log(databasesList)
    console.log('Your database:')
    databasesList.databases.forEach(db => console.log(`- ${db.name}`))
}