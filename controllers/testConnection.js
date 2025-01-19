const client = require('../config/db')

const testConnection = async(req,res)=>{
    const apiKey = req.header('ApiKey');
    const resp = await client.db("XceptionPackage").collection("projects").find({apiKey:apiKey}).toArray()

    if((resp).length == 0){
        return res.status(401).json({"message":"Invalid api key"})
    }
    return res.status(200).json({"message":"success"})

}

module.exports = testConnection