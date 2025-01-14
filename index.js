const express = require('express')
const app = express()
const dotenv = require('dotenv')
const oauth = require('./routes/oAuthRoutes')
const client = require('./config/db')
const isExisting = require('./utils/isExisting')

dotenv.config()

app.use(express.json())
app.use("/oauth",oauth)

app.get("/existing",((req,res)=>{
    const {email} = req.body
    console.log(email)
    isExisting(email)
    res.send("hi")
}))

app.listen(process.env.PORT,()=>{
    console.log(`Running on ${process.env.PORT}`)
})