const connection = require("../database/db");


const createDonation = (req, res) => {
   const casesId=req.params.case_id
    const { IBAN, amount } = req.body;
    const query = `INSERT INTO donation (IBAN, amount,case_id) VALUES (?,?,?);`;
  
    const data = [IBAN, amount,casesId];
  
    connection.query(query, data, (err, result) => {
      if (err) {
      return  res.status(500).json({
          success: false,
          message: `Server Error`,
        });
      }
  
   return res.status(201).json({
        success: true,
        message: `A donation has been successful, the donation value will be deducted from your account, thank you very much`,
        result:result
      });
    });
  };

  

  module.exports={createDonation}