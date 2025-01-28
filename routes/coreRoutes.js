const express = require("express")
const router = express.Router()

const createProject = require('../controllers/createProject')
const addException = require("../controllers/addException")
const authenticateToken = require('../utils/authenticateToken')
const testConnection = require("../controllers/testConnection")
const getAllProject = require("../controllers/getAllProjects")
const getAllExceptions = require("../controllers/getAllExceptions")

router.post("/createProject",authenticateToken,createProject)
router.post("/addException",addException)
router.get("/testConnection",testConnection)
router.post("/getAllProject",authenticateToken,getAllProject)
router.post("/getAllExceptions",authenticateToken,getAllExceptions)

module.exports = router