const express = require("express");

const { createDonation } = require("../controllers/donation");
const authentication = require("../middleware/authentication");

const donationRouter = express.Router();

donationRouter.post("/:case_id", authentication, createDonation);

module.exports = donationRouter;
