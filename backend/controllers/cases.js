const connection = require("../database/db");

const createNewCase = (req, res) => {
  const query = `INSERT INTO cases SET?`;

  const data = [req.body];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    res.status(201).json({
      success: true,
      message: `Case Created`,
    });
  });
};


const getAllCases = (req, res) => {
    const query = `SELECT * FROM cases`;

    const data = [req.params];

    connection.query(query,data,(err,result)=>{

        if (err){
            res.status(500).json({
                success:false,
                message:`Server Error`
            })
        }

      res.status(200).json({
          success:true,
          message:[result]
      })


    })
};

module.exports = {
  createNewCase,
  getAllCases
};
