const bcrypt = require("bcrypt");
const connection = require("../database/db");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const pass = req.body.pass;
  const email = req.body.email.toLowerCase();
  const query = `SELECT * FROM users WHERE email = ? `;
  const data = [email];

  connection.query(query, data, (err, result) => {
    const valid = bcrypt.compare(pass, result[0].pass);
    if (!valid) {
      return res.status(403).json({
        success: false,
        message: `The password you’ve entered is incorrect`,
      });
    }
    const payload = {
      userId: result._id,
      country: result.country,
      role: result.role,
    };
    const options = {
      expiresIn: "60h",
    };
    const token = jwt.sign(payload, process.env.SECRET, options);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Valid login credentials",
        token: token,
      });
    }
    if (err) {
      res.status(404).json({
        success: false,
        message: "The email doesn't exist",
        err: err,
      });
    }
  });
};

module.exports = { login };
