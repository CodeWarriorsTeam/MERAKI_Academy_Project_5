const express = require("express");

const {createNewCase,getAllCases, updateCaseById} = require("../controllers/cases")
=======
const { createNewCase, getAllCases } = require("../controllers/cases");

const casesRouter = express.Router();

casesRouter.post("/cases",createNewCase);
casesRouter.get("/cases",getAllCases);
casesRouter.put("/cases/:id",updateCaseById)


module.exports = casesRouter;
