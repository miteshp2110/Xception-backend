const express = require("express")
const router = express.Router()

const createProject = require('../controllers/createProject')
const addException = require("../controllers/addException")
const authenticateToken = require('../utils/authenticateToken')

router.post("/createProject",authenticateToken,createProject)
router.post("/addException",addException)



module.exports = router