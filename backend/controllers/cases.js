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

module.exports = {
  createNewCase,
};
