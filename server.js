import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import logger from 'morgan'

import { normalizePort } from './utils/serverUtils'

const app = express()

// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

// set port
const port = normalizePort(3000)
app.set('port', port)

// start server
const server = http.createServer(app)
server.listen(port, () => {
    console.log('started API server on port ' + port)
});