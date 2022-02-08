const express = require("express");

const { getAllCasesAdminPanel } = require("../controllers/admin");
const adminRouter = express.Router();

adminRouter.get("/", getAllCasesAdminPanel);
module.exports = adminRouter;
