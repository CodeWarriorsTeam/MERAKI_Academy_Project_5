const express = require('express');

const {createNewCase,getAllCases} = require("../controllers/cases")


const casesRouter = express.Router()


casesRouter.post("/cases",createNewCase);



module.exports = casesRouter;