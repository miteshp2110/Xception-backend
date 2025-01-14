const {MongoClient} = require('mongodb')
const dotenv = require('dotenv')
dotenv.config()

const MONGO_URL = process.env.MONGO_URL

const client = new MongoClient(MONGO_URL)

async function connection() {
    try{

        await client.connect()
    
        console.log("Connected to MongoDb")
    
    }
    catch(err){
        console.log("Error in connecting to database")
        console.log(err)
    }
}
connection()


module.exports = client