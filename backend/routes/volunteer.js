const express = require("express");

const {createNewVolunteer} = require("../controllers/volunteer");


const volunteerRouter = express.Router()


volunteerRouter.post("/",createNewVolunteer);


module.exports = volunteerRouter;