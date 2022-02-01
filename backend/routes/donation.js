const express = require("express");

const {createDonation} = require("../controllers/donation")

const donationRouter = express.Router();

donationRouter.post("/",createDonation);


module.exports = donationRouter;