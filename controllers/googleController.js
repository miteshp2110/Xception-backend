const passportGoogle = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const dotenv = require('dotenv')
dotenv.config()
const {getToken,getRefreshToken} = require('../utils/jwtClient')
const CLIENT_URL = process.env.CLIENT_URL
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_SECRET = process.env.GOOGLE_SECRET
const GOOGLE_CALLBACKURL = process.env.GOOGLE_CALLBACKURL
const isExisting = require('../utils/isExisting')
const client = require('../config/db')



passportGoogle.use(new GoogleStrategy({
    clientID : GOOGLE_CLIENT_ID,
    clientSecret : GOOGLE_SECRET,
    callbackURL : GOOGLE_CALLBACKURL,
},
    async function(accessToken,refreshToken,profile,done) {
        var email = profile.emails[0].value
        try{
            if(! await isExisting(email)){
                await client.db("XceptionPackage").collection("users").insertOne({email:email})
            }
            const resp = {token:getToken(email),refreshToken:getRefreshToken(email)}
            return done(null,resp)
        }
        catch(err)
        {
            return done(err)
        }
    }
))

const googleCallback = (req,res)=>{
    // console.log(req.user)
    
    res.redirect(`${CLIENT_URL}/?jwt=${req.user}`)
    // res.redirect(`google.com`)
}

module.exports = {passportGoogle,googleCallback}