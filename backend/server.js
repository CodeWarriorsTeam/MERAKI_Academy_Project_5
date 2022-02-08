const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());


const roleRouter = require("./routes/role")
app.use("/role", roleRouter) 
const userRouter = require("./routes/user")
app.use("/user", userRouter) 
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);


const casesRouter = require("./routes/cases");

app.use("/cases", casesRouter);


const adminRouter=require("./routes/admin")

app.use("/admin",adminRouter)

const donationRouter = require("./routes/donation");

app.use("/donation",donationRouter)







app.use("*", (req, res) => res.status(404).json("NO content at this path"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
