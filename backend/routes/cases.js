const express = require("express");

const {
  createNewCase,
  getAllCases,
  getCaseById,
  updateCaseById,
  deleteCaseById,
  getCasesByCategory,
  updateTheAmountRequired,
} = require("../controllers/cases");

const casesRouter = express.Router();

casesRouter.post("/", createNewCase);
casesRouter.get("/page", getAllCases);
casesRouter.get("/:id", getCaseById);
casesRouter.put("/:id", updateCaseById);
casesRouter.put("/", updateTheAmountRequired);
casesRouter.delete("/:id", deleteCaseById);
casesRouter.get("/page/category", getCasesByCategory);

module.exports = casesRouter;
