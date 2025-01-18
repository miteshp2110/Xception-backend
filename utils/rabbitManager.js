const getQueueChannel = require('../config/queue')
const client = require('../config/db')
const processedExchange = 'processedExchange'
const rawExchange = 'rawExchange'

var channel = null
var rawExceptionQueue = null
var emailQueue = null
var dbQueue = null

const collection = client.db("XceptionPackage").collection("exceptions")

async function initExchanges() {
    
    try{

        channel = await getQueueChannel()

        await channel.assertExchange(rawExchange,"fanout",{durable:true})
        await channel.assertExchange(processedExchange,"fanout",{durable:true})


        rawExceptionQueue = await channel.assertQueue("rawExceptionQueue",{durable:true,autoDelete:false})
        emailQueue = await channel.assertQueue("emailQueue",{durable:true,autoDelete:false})
        dbQueue = await channel.assertQueue("dbQueue",{durable:true,autoDelete:false})

        await channel.bindQueue(rawExceptionQueue.queue,rawExchange,'')
        await channel.bindQueue(emailQueue.queue,processedExchange,'')
        await channel.bindQueue(dbQueue.queue,processedExchange,'')
        

        console.log("Successfully initialized queues and exchanges")

    }
    catch(Err){
        console.log(Err)
    }
}


async function publishToRaw(data) {
    try{
        if (channel == null){
            console.log("Exchange not initialized")
            throw Error("Channel not initialized")
        }
        await channel.publish(rawExchange,'',Buffer.from(JSON.stringify(data)),{persistent:true})
        return true
    }   
    catch(err){
        console.log(err)
        return false
    } 
}

async function publishToProcessed(data) {
    try{
        if (channel == null){
            console.log("Exchange not initialized")
            throw Error("Channel not initialized")
        }
        await channel.publish(processedExchange,'',Buffer.from(JSON.stringify(data)),{persistent:true})
        return true
    }   
    catch(err){
        console.log(err)
        return false
    } 
}


async function consumeFromDbQueue() {

    try{
        if (channel == null){
            console.log("Exchange not initialized")
            throw Error("Channel not initialized")
        }
        
        channel.consume(dbQueue.queue,async(message)=>{
            if(message.content){

                const data = JSON.parse(message.content)
                const exists = await collection.find({apiKey:data.apiKey}).toArray()
                if(exists.length == 1){
                    await collection.updateOne({apiKey:data.apiKey},{$push:{exceptions:{exception:data.exception,llmResponse:data.llmResponse}}})
                    channel.ack(message)
                }
                
            }
        },{noAck:false})
        
    }   
    catch(err){
        console.log(err)
        
    } 
}


module.exports = {initExchanges,publishToProcessed,publishToRaw,consumeFromDbQueue}