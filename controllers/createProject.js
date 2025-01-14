const client = require("../config/db")

const createProject = async(req,res)=>{
    const {name} = req.body
    if (!name){
        return res.status(400).json({"error":"Name not provided"})
    }
    const isUsed = await client.db("XceptionPackage").collection("projects").find({name:name}).toArray()

    if(isUsed.length)
    res.send("yes")
}

module.exports = createProject