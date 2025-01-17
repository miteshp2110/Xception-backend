const {publishToRaw} = require('../utils/rabbitManager')
const client = require("../config/db")
const addException = async(req,res)=>{
    const {data} = req.body

    if (!data){
        return res.status(400).json({"message":"Invalid request body"})
    }

    const resp = await client.db("XceptionPackage").collection("projects").find({apiKey:data.apiKey}).toArray()

    if( resp.length == 0){
        return res.status(401).json({"message":"Unathorized Access"})
    }

    const published = await publishToRaw(data)

    if(published){
        return res.status(200).json({"message":"success"})
    }

    return res.status(500).json({"message":"some error"})
}


module.exports = addException