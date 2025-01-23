//This manages the oAuth related to Github.
const {getToken} = require('../utils/jwtClient')
const passportGithub = require('passport')
const GitHubStrategy = require('passport-github2').Strategy
const dotenv = require('dotenv')
dotenv.config()

const CLIENT_URL = process.env.CLIENT_URL
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_SECRET = process.env.GITHUB_SECRET
const GITHUB_CALLBACKURL = process.env.GITHUB_CALLBACKURL

const isExisting = require('../utils/isExisting')
const client = require('../config/db')

passportGithub.use(new GitHubStrategy(
    {
        clientID : GITHUB_CLIENT_ID,
        clientSecret : GITHUB_SECRET,
        callbackURL : GITHUB_CALLBACKURL,
        scope : ['user:email']
    },
    async(accessToken, refreshToken, profile, done)=>{
        var email = profile.emails[0].value
        
        try{
            if(! await isExisting(email)){
                await client.db("XceptionPackage").collection("users").insertOne({email:email})
            }
            const resp = {token:getToken(email)}
            return done(null,resp)
        }
        catch(err){
            return done(err)
        }
    }
))

const githubCallback = (req,res)=>{
    // console.log(req.user)
    res.redirect(`${CLIENT_URL}/?jwt=${req.user}`)
    
}

module.exports = {passportGithub,githubCallback}

