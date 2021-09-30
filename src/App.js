import express from 'express'
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

    app.use(express.json())

    app.use('/v1', apiV1)

    app.get('/', async (req, res) => {
        res.end('<h1>Hello World! MINH CUONG</h1>')
    })

    app.listen(env.APP_PORT || 8080, env.APP_HOST, () => {
        console.log(`sever is running at ${env.APP_HOST}:${env.APP_PORT}/`)
    })
}

