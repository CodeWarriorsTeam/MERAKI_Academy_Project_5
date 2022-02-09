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


  const getCountEdu = (req, res) => {
    const query = `SELECT  COUNT(TheAmountRequired) AS "countEducation" FROM cases   WHERE cases.category='education' && cases.is_deleted=0 &&cases.TheAmountRequired=0`;
  
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

  const getCountFood = (req, res) => {
    const query = `SELECT  COUNT(TheAmountRequired) AS "countFood" FROM cases   WHERE cases.category='food' && cases.is_deleted=0 &&cases.TheAmountRequired=0`;
  
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

  const getCountRebuilding = (req, res) => {
    const query = `SELECT  COUNT(TheAmountRequired) AS "CountRebuilding" FROM cases   WHERE cases.category='Rebuilding' && cases.is_deleted=0 &&cases.TheAmountRequired=0`;
  
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
  

  const getCountMedSupplies = (req, res) => {
    const query = `SELECT  COUNT(TheAmountRequired) AS "CountMedSupplies" FROM cases   WHERE cases.category='Medical Supplies' && cases.is_deleted=0 &&cases.TheAmountRequired=0`;
  
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


  const getCountUser = (req, res) => {
    const query = `SELECT  COUNT(id) AS "CountUser" FROM users   WHERE  users.is_deleted=0 `;
  
    connection.query(query, async (err, result) => {
      if (err) {
          console.log(err);
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

module.exports = { getAllCasesAdminPanel,getCountEdu,getCountFood,getCountRebuilding ,getCountMedSupplies,getCountUser};