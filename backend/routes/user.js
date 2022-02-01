const express = require("express");

const { createNewUser } = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/", createNewUser);

module.exports = userRouter;
