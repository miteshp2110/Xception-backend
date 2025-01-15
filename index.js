const express = require('express')
const app = express()
const dotenv = require('dotenv')
const oauth = require('./routes/oAuthRoutes')
const client = require('./config/db')
const core = require('./routes/coreRoutes')
const authenticateToken = require('./utils/authenticateToken')
const {initExchanges} = require('./utils/rabbitManager')
dotenv.config()

initExchanges()


app.use(express.json())
app.use("/oauth",oauth)
app.use("/api",authenticateToken,core)
app.listen(process.env.PORT,()=>{
    console.log(`Running on ${process.env.PORT}`)
})