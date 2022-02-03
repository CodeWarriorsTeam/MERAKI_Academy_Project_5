const connection = require("../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const createNewUser = async (req, res) => {
  const { firstName, lastName, country, email, pass, role_id } = req.body;
  const hashingPassword = await bcrypt.hash(pass, salt);
  const query = `INSERT INTO users (firstName, lastName, country, email, pass, role_id) VALUES (?,?,?,?,?,?);`;
  const data = [firstName, lastName, country, email, hashingPassword, role_id];
  connection.query(query, data, (err, result) => {
    if (result) {
      res.status(201).json({
        success: true,
        message: `Success User Added`,
        result: result,
      });
    } else if (err) {
      res.status(409).json({
        success: false,
        message: `The email already exists`,
        err: err,
      });
    }
  });
};

module.exports = {
  createNewUser,
};
