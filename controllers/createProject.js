const client = require("../config/db")
const generateApiKey = require('../utils/generateApiKey')

const collection = client.db("XceptionPackage").collection("projects")

const createProject = async(req,res)=>{
    try{

        const {name} = req.body
        if (!name){
            return res.status(400).json({"error":"Name not provided"})
        }
        const isUsed = await collection.find({name:name}).toArray()

        if(isUsed.length == 1){
            return res.status(401).json({"error":"name already taken"})
        }


        const apiKey = generateApiKey()

        await collection.insertOne({name:name,key:apiKey,email:req.user})
        await client.db("XceptionPackage").collection("exceptions").insertOne({apiKey:apiKey,exceptions:[]})

        return res.status(201).json({"message":"Project created successfully","apiKey":apiKey})
    }
    catch(err){
        console.log(err)
    }
}

module.exports = createProject