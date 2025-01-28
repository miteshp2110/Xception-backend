const client = require('../config/db')
const database = client.db("XceptionPackage")
const collection = database.collection("projects")
const getAllProject = async(req,res)=>{
    
    try{
        const email = req.user
        const results = await collection.find({email:email}).toArray()
        return res.status(200).json({"data":results})
    }
    catch(err){
        console.log("Error in getAllProject")
        console.log(err)
        return res.status(500).json({"message":"Internal server error"})
    }    
}

module.exports = getAllProject