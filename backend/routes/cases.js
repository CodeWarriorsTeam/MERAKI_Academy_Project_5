const express = require("express");

const {createNewCase,getAllCases, updateCaseById} = require("../controllers/cases")

const casesRouter = express.Router();

casesRouter.post("/",createNewCase);
casesRouter.get("/",getAllCases);
casesRouter.put("/:id",updateCaseById)


module.exports = casesRouter;
