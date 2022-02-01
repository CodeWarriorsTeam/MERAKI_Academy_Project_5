const express = require('express');

const {createNewCase,getAllCases} = require("../controllers/cases")


const casesRouter = express.Router()


casesRouter.post("/cases",createNewCase);
casesRouter.get("/cases",getAllCases);



module.exports = casesRouter;