const express = require('express')
const app = express()
const dotenv = require('dotenv')
const oauth = require('./routes/oAuthRoutes')
const client = require('./config/db')
const core = require('./routes/coreRoutes')
const cors  = require('cors')
const {initExchanges,consumeFromDbQueue,publishToProcessed} = require('./utils/rabbitManager')
dotenv.config()
app.use(cors())


initExchanges().then(()=>{
    consumeFromDbQueue()

})
  
app.use(express.json())


app.use("/oauth",oauth)
app.use("/api",core)


app.listen(process.env.PORT,()=>{
    console.log(`Running on ${process.env.PORT}`)
})