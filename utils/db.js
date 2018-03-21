import mongoose, { connection } from 'mongoose'

const HOST = 'localhost',
    PORT = 27017,
    DB = 'test',
    reconnectAfterSeconds = 5,
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