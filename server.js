import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import logger from 'morgan'

import { normalizePort } from './utils/serverUtils'
import routeHandler from './routes'

const app = express()

// parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

// serve static files
app.use(express.static(path.join(__dirname, 'public')))

//Allow CORS
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

//serve routes
app.use('/api/v2', routeHandler, function (req, res) {
    // any route not defined will return 404
    res.status(404).send('API not found')
})

// throw 500 error for other server related error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

// set port
const port = normalizePort(3000)
app.set('port', port)

// start server
const server = http.createServer(app)
server.listen(port, () => {
    console.log('started API server on port ' + port)
});