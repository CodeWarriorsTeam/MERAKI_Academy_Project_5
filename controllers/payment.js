const connection = require("../database/db");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

const stripe=require("stripe")(process.env.STRIPE_SECRET_TEST)
const bodyParser=require("body-parser");
const { log } = require("npmlog");
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(express.json());




const donateByPayment= async(req,res)=>{
    let {amount,id}=req.body
    try{
  const payment=await stripe.paymentIntents.create({
    amount:amount,
    currency:"USD",
    description:"donate company",
    payment_method:id,
    confirm:true
  
  })
  const title= [req.body.title];
  const query = `SELECT * FROM cases  WHERE title=? and is_deleted=0`;
  connection.query(query, title, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No case at title ${title}`,
      });
    }

    if (result[0]) {
      
      let  donations  = amount;
      let TheAmountRequired = result[0].TheAmountRequired - amount;
      const query = `UPDATE cases SET TheAmountRequired=?,donations=? WHERE title=?;`;
      const data = [TheAmountRequired, donations, title];
      connection.query(query, data, (err, results) => {
        if (err) {
          return res.status(404).json({
            success: false,
            massage: `Server error`,
            err: err,
          });
        }
        if (results.changedRows == 0) {
          res.status(404).json({
            success: false,
            massage: `The cases: ${title} is not found`,
            err: err,
          });
        }

        res.status(201).json({
          success: true,
          massage: `cases updated`,
          results: results,
        });
      });
    }
  });
  

  
    }
  
  
    catch (error){
  res.json({
    message:"The operation failed",
    success:false
  })
    }
  }


  module.exports = { donateByPayment };