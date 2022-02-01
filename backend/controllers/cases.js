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
      result: result
    });
  });
};

const getAllCases = (req, res) => {
  const limit=10
  const page =req.query.page
  console.log(page);
  const offset  = (page - 1) * limit
  const query = `SELECT * FROM cases WHERE is_deleted=0 limit ${limit} OFFSET ${offset} `;

  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    return  res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

if (!result[0]){
  return res.status(200).json({
    success:false,
    message: `no cases yet`
  })
}


    res.status(200).json({
      success: true,
      message: result
    });
  });
};

const getCaseById = (req, res) => {
  const query = `SELECT * FROM cases WHERE id=? and is_deleted=0`;

  const data = [req.params.id];
  connection.query(query, data, (err, result) => {
    if (err) {
    return  res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]){
      return res.status(200).json({
        success:false,
        message: `No case at id ${data}`
      })
    }

    res.status(200).json({
      success: true,
      message: `The Case with id ${data}`,
      result: result
    });
  });
};

const updateCaseById = (req, res) => {
  const query = `UPDATE cases SET? WHERE id=?`;

  const data = [req.body, req.params.id];

  connection.query(query, data, (err, result) => {
    if (err) {
     return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result.affectedRows){
     return res.status(404).json({
        success:false,
        message: `The Case is not Found`,

    })
  }
    res.status(201).json({
      success: true,
      message: `Case Updated `,
    });
  });
};


const deleteCaseById = (req,res)=>{
const query = `UPDATE cases SET is_deleted=1 WHERE id=?` 

const data = [req.params.id];

connection.query(query,data,(err,result)=>{
  if (err){
    console.log(err);
   return res.status(500).json({
      success:false,
      message: `Server Error`
    })
  }

  if (!result.affectedRows){
return res.status(404).json({
  success:false,
  message: `The Case with ${data} not Found`

})
  }

  res.status(200).json({
    success:true,
    message: `Succeeded to delete case with id ${data}`

  })
})
}


module.exports = {
  createNewCase,
  getAllCases,
  getCaseById,
  updateCaseById,
  deleteCaseById
};
