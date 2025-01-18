const express = require('express')
const app = express()
const dotenv = require('dotenv')
const oauth = require('./routes/oAuthRoutes')
const client = require('./config/db')
const core = require('./routes/coreRoutes')
const {initExchanges,consumeFromDbQueue,publishToProcessed} = require('./utils/rabbitManager')
dotenv.config()


initExchanges().then(()=>{
    consumeFromDbQueue()
    // publishToProcessed({apiKey:"2ClSvVA4pHf1",exception:"Some exception text",response:"llm response"})
})
  
app.use(express.json())


app.use("/oauth",oauth)
app.use("/api",core)


app.listen(process.env.PORT,()=>{
    console.log(`Running on ${process.env.PORT}`)
})