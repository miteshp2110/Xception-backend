const express = require('express')
const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const {passportGoogle,googleCallback} = require('../controllers/googleController')
const {passportGithub,githubCallback} = require('../controllers/githubController')

router.get("/google",passportGoogle.authenticate('google',{
    scope:['email','profile']
}))
router.get("/google/callback",passportGoogle.authenticate('google',{session:false,failureRedirect:process.env.CLIENT_URL}),googleCallback)

router.get("/github",passportGithub.authenticate('github',{scope:['user:email']}))
router.get("/github/callback",passportGithub.authenticate('github',{session:false,failureRedirect:`${process.env.CLIENT_URL}/login`}),githubCallback)


module.exports = router