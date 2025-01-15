const getQueueChannel = require('../config/queue')

const emailExchange = 'emailExchange'
const llmExchange = 'llmExchange'

var channel = null

async function initExchanges() {
    
    try{

        channel = await getQueueChannel()

        await channel.assertExchange(emailExchange,"fanout",{durable:true})
        await channel.assertExchange(llmExchange,"fanout",{durable:true})

        const rawExceptionQueue = await channel.assertQueue("rawExceptionQueue",{durable:true,autoDelete:true})
        const emailQueue = await channel.assertQueue("emailQueue",{durable:true,autoDelete:true})

        await channel.bindQueue(rawExceptionQueue.queue,llmExchange,'')
        await channel.bindQueue(emailQueue.queue,emailExchange,'')

        console.log("Successfully initialized queues and exchanges")

    }
    catch(Err){
        console.log(Err)
    }
}


async function publishToLlm(data) {
    try{
        if (channel == null){
            console.log("Exchange not initialized")
            throw Error("Channel not initialized")
        }
        await channel.publish(llmExchange,'',Buffer.from(JSON.stringify(data)),{persistent:true})
        return true
    }   
    catch(err){
        console.log(err)
        return false
    } 
}

async function publishToEmail(data) {
    try{
        if (channel == null){
            console.log("Exchange not initialized")
            throw Error("Channel not initialized")
        }
        await channel.publish(emailExchange,'',Buffer.from(JSON.stringify(data)),{persistent:true})
        return true
    }   
    catch(err){
        console.log(err)
        return false
    } 
}

module.exports = {initExchanges,publishToEmail,publishToLlm}