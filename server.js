import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import logger from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

import { normalizePort } from './utils/serverUtils'
import routeHandler from './routes'

import { db } from './utils/db'

import { STATUS_CODE } from './utils/constants'

const app = express()

const swaggerSpec = swaggerJSDoc({
    swaggerDefinition: {
        info: {
            title: 'Friends and Subscribers Management API Server',
            version: '1.0.0',
        },
        basePath: '/api/v2'
    },
    apis: ['./routes/friendRoutes.js', './routes/subscriberRoutes.js']
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

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
        res.status(STATUS_CODE.SUCCESS).end();
    } else {
        next();
    }
});

//serve routes
app.use('/api/v2', routeHandler, function (req, res) {
    // any route not defined will return 404
    res.status(STATUS_CODE.NOT_FOUND).send('API not found')
})

// throw 500 error for other server related error
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(STATUS_CODE.INTERNAL_ERROR).send('Something broke!')
})

// set port
const port = normalizePort(process.env.PORT)
app.set('port', port)

// start server
const server = http.createServer(app)
server.listen(port, () => {
    console.log('started API server on port ' + port)
})

export default app