const {publishToRaw} = require('../utils/rabbitManager')
const client = require("../config/db")
const addException = async(req,res)=>{
    let {data} = req.body

    if (!data){
        return res.status(400).json({"message":"Invalid request body"})
    }

    const resp = await client.db("XceptionPackage").collection("projects").find({apiKey:data.apiKey}).toArray()

    
    if( resp.length == 0){
        return res.status(401).json({"message":"Unathorized Access"})
    }

    data.project = resp[0].name
    data.email = resp[0].email
    // const sampleDataRAW = {
    //     apiKey : "some api key",    // from client
    //     exception : "some exception",   // from client
    //     project : "project name",   // from db
    //     fileName : "fileName.js",   //from client
    //     date: "date of exception",  //from client
    //     time : "time of exception"  // from client
    // }


    const published = await publishToRaw(data)

    if(published){
        return res.status(200).json({"message":"success"})
    }

    return res.status(500).json({"message":"some error"})
}


module.exports = addException