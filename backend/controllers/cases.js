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

  connection.query(query, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    res.status(200).json({
      success: true,
      message: [result],
    });
  });
};


const getCaseById = (req,res)=>{

  const query = `SELECT * FROM cases WHERE id=?`;


  const data = [req.params.id]
  connection.query(query,data,(err,result)=>{

    if (err){
      res.status(404).json({
        success:false,
        message: `The Case not Found`
      })
    }

    res.status(200).json({
       success:true,
       message: `The Case with id ${data}`,
       result: [result]
       
    })
  })
}










const updateCaseById = (req,res)=>{
const query = `UPDATE cases SET? WHERE id=?`

const data = [req.body,req.params.id]

connection.query(query,data,(err,result)=>{

if (err){
    res.status(404).json({
        success:false,
        message:`The Case is not Found`
    })
}

    res.status(201).json({
        success:true,
        message:`Case Updated `
    })
})
}


module.exports = {
  createNewCase,
  getAllCases,
  getCaseById,
  updateCaseById
};
