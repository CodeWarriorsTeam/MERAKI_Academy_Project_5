const express = require("express");

const {createDonation} = require("../controllers/donation")

const donationRouter = express.Router();

casesRouter.post("/",createDonation);


module.exports = donationRouter;