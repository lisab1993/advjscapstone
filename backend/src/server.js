const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')


//initialize dotenv
const envPath = path.resolve(__dirname, "../../.env")
dotenv.config({
    path: envPath
})

//initialize express
const app = express()

//middleware
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

//connect to database
const connectDb = async (db = process.env.DB_NAME) => {
    const connection = await mongoose.connect(`mongodb://localhost/${db}`)
    if (process.env.ENV !== 'test') {
        console.log(`Connected to ${db}`)
    }
    return connection
}

//start the server
const startServer = async() => {
    app.listen(process.env.PORT, async() => {
        await connectDb()
        if (process.env.ENV !== 'test') {
            console.log(`Server listening on port ${process.env.PORT}`)
        }
    })
}

module.exports = {
    app,
    connectDb,
    startServer
}