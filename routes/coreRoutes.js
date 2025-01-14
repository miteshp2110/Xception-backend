const express = require("express")
const router = express.Router()

const createProject = require('../controllers/createProject')

router.get("/createProject",createProject)

module.exports = router