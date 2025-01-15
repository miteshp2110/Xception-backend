const amqplib = require('amqplib')
const dotenv = require('dotenv')
dotenv.config()

const RABBIT_MQ_HOST = process.env.RABBIT_MQ_HOST
const RABBIT_MQ_PORT = process.env.RABBIT_MQ_PORT
const RABBIT_MQ_USER = process.env.RABBIT_MQ_USER 
const RABBIT_MQ_PASSWORD = process.env.RABBIT_MQ_PASSWORD

async function getQueueChannel(){
    try{
        
        const connection = await amqplib.connect(`amqp://${RABBIT_MQ_USER}:${RABBIT_MQ_PASSWORD}@${RABBIT_MQ_HOST}:${RABBIT_MQ_PORT}`)
        
        const channel = await connection.createChannel()
        console.log("Rabbit Mq connected")
        return channel
    }
    catch(err){
        console.log(err)
    }
} 



module.exports = getQueueChannel