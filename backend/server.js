const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const db = require("./database/db");

app.use(cors());

app.use(express.json());



////batool
















/////naamneh
const casesRouter = require("./routes/cases");

app.use("/",casesRouter);


app.use("*", (req, res) => res.status(404).json("NO content at this path"));


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER WORKING ON PORT: ${PORT}`);
});
