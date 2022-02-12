const express = require("express");

const {createNewVolunteer, getAllVolunteers} = require("../controllers/volunteer");


const volunteerRouter = express.Router()


volunteerRouter.post("/",createNewVolunteer);

volunteerRouter.get("/",getAllVolunteers)


module.exports = volunteerRouter;