const express = require("express")
const router = express.Router()

const createProject = require('../controllers/createProject')
const addException = require("../controllers/addException")

router.post("/createProject",createProject)
router.post("/addException",addException)

module.exports = router