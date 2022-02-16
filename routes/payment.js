const express = require("express");
const cors = require("cors");
const { donateByPayment } = require("../controllers/payment");
const paymentRouter = express.Router();


paymentRouter.post("/",cors(), donateByPayment)

module.exports = paymentRouter