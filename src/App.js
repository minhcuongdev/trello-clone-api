import express from 'express'
import { connectDB } from '*/config/mongodb.js'
import { env } from '*/config/environment.js'

const app = express()

connectDB().catch(console.log)

app.get('/', (req, res) => {
    res.end('<h1>Hello World! MINH CUONG</h1>')
})

app.listen(env.PORT || 8080, env.HOST, () => {
    console.log(`sever is running at ${env.HOST}:${env.PORT}/`)
})