const express = require("express");

const { getAllCasesAdminPanel,getCountEdu,getCountFood ,getCountRebuilding,getCountMedSupplies,getCountUser} = require("../controllers/admin");
const adminRouter = express.Router();

adminRouter.get("/page", getAllCasesAdminPanel);
adminRouter.get("/cuntEdu", getCountEdu);
adminRouter.get("/cuntFood", getCountFood);
adminRouter.get("/cuntReb", getCountRebuilding);
adminRouter.get("/cuntMedSupp", getCountMedSupplies);
adminRouter.get("/cuntUser", getCountUser);
module.exports = adminRouter;
