const connection = require("../database/db");
const bcrypt = require("bcrypt");
const salt = 10;

const createNewUser = async (req, res) => {
  const { profile_image, firstName, lastName, country, email, pass, role_id } =
    req.body;
  const hashingPassword = await bcrypt.hash(pass, salt);
  const query = `INSERT INTO users (profile_image,firstName, lastName, country, email, pass, role_id) VALUES (?,?,?,?,?,?,?);`;
  const data = [
    profile_image,
    firstName,
    lastName,
    country,
    email,
    hashingPassword,
    role_id,
  ];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(409).json({
        success: false,
        message: "The email already exists",
        err: err,
      });
    } 
  
  
  res.status(201).json({
        success: true,
        message: `Success User Added`,
        result: result,
      });
    
  });
};
const getAllUsers = (req, res) => {
  const query = `SELECT * FROM users  WHERE users.is_deleted=0  `;

  connection.query(query, async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `no user yet`,
      });
    }

    res.status(200).json({
      success: true,
      message: `all users`,
      result: result,
    });
  });
};
module.exports = {
  createNewUser,getAllUsers
};
