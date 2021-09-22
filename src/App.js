import express from 'express'
import { mapOrder } from '*/utilities/sort.js'

const app = express()

const hostname = 'localhost'
const port = 8080

app.get('/', (req, res) => {
    res.end('<h1>Hello World! MINH CUONG</h1>')
})

app.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`sever is running at ${hostname}:${port}/`)
})