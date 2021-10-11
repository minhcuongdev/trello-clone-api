import express from 'express'
import cors from 'cors'
import { corsOptions } from './config/cors'
import { connectDB } from '*/config/mongodb'
import { env } from '*/config/environment'
import { apiV1 } from '*/routers/v1'


connectDB()
    .then(() => console.log('Connected to database successfully!'))
    .then(() => bootApp())
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })

const bootApp = () => {
    const app = express()

    app.use(cors(corsOptions))

    app.use(express.json())

    app.use('/v1', apiV1)

    app.get('/', async (req, res) => {
        res.status(200).json('ACCESS SEVER')
    })

    app.listen(env.APP_PORT || process.env.PORT, env.APP_HOST, () => {
        console.log(`sever is running at port : ${process.env.PORT}`)
    })
}

