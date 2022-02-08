const connection = require("../database/db");

const getAllCasesAdminPanel = (req, res) => {
    const query = `SELECT * FROM cases   WHERE cases.is_deleted=0 `;
  
    connection.query(query, async (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: `Server Error`,
        });
      }
  
      if (!result[0]) {
        return res.status(404).json({
          success: false,
          message: `no cases yet`,
        });
      }
  
      res.status(200).json({
        success: true,
        message: `all cases`,
        result: result,
      });
    });
  };



  
module.exports = { getAllCasesAdminPanel };