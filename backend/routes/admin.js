const express = require("express");

const { getAllCasesAdminPanel,getSum } = require("../controllers/admin");
const adminRouter = express.Router();

adminRouter.get("/", getAllCasesAdminPanel);
adminRouter.get("/cunt", getSum);
module.exports = adminRouter;
