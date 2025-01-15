const {publishToLlm} = require('../utils/rabbitManager')

const addException = async(req,res)=>{
    const {data} = req.body

    if (!data){
        return res.status(400).json({"message":"Invalid request body"})
    }

    const published = await publishToLlm(data)

    if(published){
        return res.status(200).json({"message":"success"})
    }

    return res.status(500).json({"message":"some error"})
}


module.exports = addException