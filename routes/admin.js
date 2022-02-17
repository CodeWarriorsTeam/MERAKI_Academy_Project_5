const express = require("express");

const {
  getAllCasesAdminPanel,
  getCountEdu,
  getCountFood,
  getCountVolunteer,
  getCountRebuilding,
  getCountCase,
  getCountMedSupplies,
  getCountUser,
  getAllCasesEmergency,
  updateCaseByIdForEmergency
} = require("../controllers/admin");
const adminRouter = express.Router();

adminRouter.get("/page", getAllCasesAdminPanel);
adminRouter.get("/cuntEdu", getCountEdu);
adminRouter.get("/cuntFood", getCountFood);
adminRouter.get("/cuntReb", getCountRebuilding);
adminRouter.get("/cuntMedSupp", getCountMedSupplies);
adminRouter.get("/cuntUser", getCountUser);
adminRouter.get("/countCase", getCountCase);
adminRouter.get("/countVolunteer", getCountVolunteer);
adminRouter.get("/emergency", getAllCasesEmergency);
adminRouter.put("/emergency/:id", updateCaseByIdForEmergency);

module.exports = adminRouter;
