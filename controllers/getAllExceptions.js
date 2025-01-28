const client = require('../config/db')
const database = client.db("XceptionPackage")
const collection = database.collection("exceptions")
const getAllExceptions = async(req,res)=>{
    
    const {apiKey} = req.body
    if(!apiKey){
        return res.status(400).json({"message":"invalid body"})
    }

    try{
        
        const results = await collection.find({apiKey:apiKey}).toArray()
        const finalArray=[]
        results.forEach((result)=>{
            finalArray.push(result.exceptions)
        })
        return res.status(200).json({"data":finalArray})
    }
    catch(err){
        console.log("Error in getAllExceptions")
        console.log(err)
        return res.status(500).json({"message":"Internal server error"})
    }    
}

module.exports = getAllExceptions