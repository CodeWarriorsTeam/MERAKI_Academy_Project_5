const express = require("express");

const { createNewUser,getAllUsers } = require("../controllers/user");
const userRouter = express.Router();

userRouter.post("/", createNewUser);

userRouter.get("/all", getAllUsers)
module.exports = userRouter;
