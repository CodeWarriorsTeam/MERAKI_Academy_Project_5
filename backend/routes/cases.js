const express = require("express");

const {createNewCase,getAllCases,getCaseById,updateCaseById} = require("../controllers/cases")

const casesRouter = express.Router();

casesRouter.post("/",createNewCase);
casesRouter.get("/",getAllCases);
casesRouter.get("/:id",getCaseById)
casesRouter.put("/:id",updateCaseById)


module.exports = casesRouter;
