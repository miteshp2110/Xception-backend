//This manages all the operations for JWT.

const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

function getToken(email){
    const token =  jwt.sign({email:email},JWT_SECRET,{algorithm:'HS256',expiresIn:'7d'})
    return token
}

function getRefreshToken(email){
    const token =  jwt.sign({email:email,type:"refresh"},JWT_SECRET,{algorithm:'HS256',expiresIn:'10s'})
    return token
}

function tokenStatus(token){
    try{
        const decodedToken = jwt.verify(token,JWT_SECRET)
        if(decodedToken.type === 'refresh'){
            return getToken(decodedToken.email)
        }

    }
    catch(err){
        return null
        
    }
}

module.exports = {getRefreshToken,getToken,tokenStatus}
