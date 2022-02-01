const express = require("express");

const {createNewCase,getAllCases,getCaseById,updateCaseById,deleteCaseById} = require("../controllers/cases")

const casesRouter = express.Router();

casesRouter.post("/",createNewCase);
casesRouter.get("/",getAllCases);
casesRouter.get("/:id",getCaseById);
casesRouter.put("/:id",updateCaseById);
casesRouter.delete("/:id",deleteCaseById);


module.exports = casesRouter;
