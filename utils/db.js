import mongoose, { connection } from 'mongoose'

const HOST = process.env.DBHOST,
    PORT = process.env.DBPORT,
    DB = process.env.DBDATABASE,
    reconnectAfterSeconds = process.env.DBRECONNECTAFTERSEC,
    ConnectionURI = `mongodb://${HOST}:${PORT}/${DB}`


const connectToMongo = () => mongoose.connect(ConnectionURI, err => {
    if (err) {
        console.error(`Failed to connect to mongo on startup - retrying in ${reconnectAfterSeconds} sec`, err)
        mongoose.disconnect()
        setTimeout(connectToMongo, reconnectAfterSeconds * 1000)
    }
    console.log('API server connected to mongodb')
}).catch(err => console.error(err))

// initiate connection
connectToMongo()

module.exports.db = mongoose