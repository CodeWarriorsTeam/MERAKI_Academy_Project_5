const connection = require("../database/db");


const createDonation = (req, res) => {

    const { IBAN, amount } = req.body;
    const donor_id = req.token.userId;
    const query = `INSERT INTO donation (IBAN, amount, donor_id) VALUES (?,?,?);`;
  
    const data = [IBAN, amount, donor_id];
  
    connection.query(query, data, (err, result) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: `Server Error`,
        });
      }
  
      res.status(201).json({
        success: true,
        message: `A donation has been successful, the donation value will be deducted from your account, thank you very much`,
        result:result
      });
    });
  };

  module.exports={createDonation}