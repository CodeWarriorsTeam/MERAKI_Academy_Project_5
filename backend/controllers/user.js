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
        massage: "The email already exists",
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

module.exports = {
  createNewUser,
};
