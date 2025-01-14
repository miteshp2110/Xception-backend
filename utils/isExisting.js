const client = require('../config/db')

async function isExisting(email) {
    try{

        const database = client.db('XceptionPackage')
        const collection = database.collection('users')

        const result = await collection.find({email:email}).toArray()

        if(result.length == 0){
            return false
        }
        else{
            return true
        }
        

    }
    catch(err){
        console.log(err)
    }
    

}

module.exports = isExisting