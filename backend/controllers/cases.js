const connection = require("../database/db");

const createNewCase = (req, res) => {
  const {
    category,
    case_image,
    title,
    case_description,
    TheAmountRequired,
    donations,
  } = req.body;
  const query = `INSERT INTO cases (category, case_image,title, case_description,TheAmountRequired,donations) VALUES (?,?,?,?,?,?); `;

  const data = [
    category,
    case_image,
    title,
    case_description,
    TheAmountRequired,
    donations,
  ];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    res.status(201).json({
      success: true,
      message: `Case Created`,
      result: result,
    });
  });
};
///////SELECT * FROM roles INNER JOIN users ON users.role_id=roles.id WHERE email=?
////SELECT cases.*, donation.* FROM cases LEFT JOIN donation ON donation.case_id=cases.id WHERE cases.is_deleted=0
const getAllCases = (req, res) => {
  // const limit = 4;
  // const page = req.query.page;
  // const offset = (page - 1) * limit;
  // const query = `SELECT donation.IBAN,donation.amount,donation.case_id,cases.* FROM donation RIGHT JOIN cases ON cases.id=donation.case_id WHERE cases.is_deleted=0  `;
  // const query = `SELECT donation.IBAN,donation.amount,donation.case_id,cases.* FROM donation RIGHT JOIN cases ON cases.id=donation.case_id WHERE cases.is_deleted=0 `;

  const query = `SELECT * FROM cases   WHERE cases.is_deleted=0`;

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

    let array = [];
    let resultUpdate = [];

    //  result.forEach((element)=>{
    //  array.forEach((element2)=>{
    //     if(!element.case_id==element2.case_id){
    //     resultUpdate.push(element)
    //     }
    //   })
    //   // return resultUpdate
    // })
    // console.log(result.length);
    // for (let i = 0; i < result.length; i++) {
    //   if(result[i].case_id==array[i].case_id){
    //     resultUpdate.push(result[i])
    //   }
    //   return resultUpdate
    // }

    // console.log(element);
    // console.log(array.includes(element.case_id));
    // if(!array.includes(element.case_id)){
    //   array.push(element)
    // }
    // -----------
    //   let f = [];
    //  await result.forEach((element) => {
    //     if (!array.includes(element.case_id)) {
    //       array.push(element.case_id);
    //       element.donations += element.amount;
    //       element.TheAmountRequired -= element.amount;
    //       resultUpdate.push(element);
    //     } else {
    //       resultUpdate.forEach((ele) => {
    //         if (ele.case_id == element.case_id) {
    //           ele.donations += element.amount;
    //           ele.TheAmountRequired -= element.amount;
    //         }
    //       });
    //     }
    //   });
    console.log(resultUpdate.length);
    res.status(200).json({
      success: true,
      message: `all cases`,
      result: result,
    });
  });
};

const getCaseById = (req, res) => {
  const query = `SELECT * FROM cases  WHERE id=? and is_deleted=0`;

  const data = [req.params.id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No case at id ${data}`,
      });
    }

    res.status(200).json({
      success: true,
      message: `The Case with id ${data}`,
      result: result,
    });
  });
};

const updateCaseById = (req, res) => {
  const query = `UPDATE cases SET? WHERE id=?`;

  const data = [req.body, req.params.id];

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `The Case is not Found`,
      });
    }
    res.status(201).json({
      success: true,
      message: `Case Updated `,
      results: result,
    });
  });
};

const deleteCaseById = (req, res) => {
  const query = `UPDATE cases SET is_deleted=1 WHERE id=?`;

  const data = [req.params.id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result.affectedRows) {
      return res.status(404).json({
        success: false,
        message: `The Case with ${data} not Found`,
      });
    }

    res.status(200).json({
      success: true,
      message: `Succeeded to delete case with id ${data}`,
    });
  });
};

const getCasesByCategory = (req, res) => {
  const limit = 4;
  const page = req.query.page;

  const offset = (page - 1) * limit;

  const data = [req.query.category];

  // SELECT * FROM donation RIGHT JOIN cases ON case_id=cases.id  WHERE cases.is_deleted=0
//SELECT * FROM cases   WHERE cases.is_deleted=0
  const query = `SELECT * FROM cases WHERE cases.is_deleted=0 AND category=?  `;

  connection.query(query, data, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `no cases in this category ==>${data} `,
      });
    }
    // let array = [];
    // let resultUpdate = [];
    // result.forEach((element) => {
    //   if (!array.includes(element.case_id)) {
    //     array.push(element.case_id);
    //     element.donations += element.amount;
    //     element.TheAmountRequired -= element.amount;
    //     resultUpdate.push(element);
    //   } else {
    //     resultUpdate.forEach((ele) => {
    //       if (ele.case_id == element.case_id) {
    //         ele.donations += element.amount;
    //         ele.TheAmountRequired -= element.amount;
    //       }
    //     });
    //   }
    // });

    res.status(200).json({
      success: true,
      message: `all cases by category`,
      result: result,
    });
  });
};

const updateTheAmountRequired = (req, res) => {
  
  const id = [req.body.id];
  const query = `SELECT * FROM cases  WHERE id=? and is_deleted=0`;
  connection.query(query, id, (err, result) => {
    if (err) {
      console.log("errrr",err);
      return res.status(500).json({
        success: false,
        message: `Server Error`,
      });
    }

    if (!result[0]) {
      return res.status(200).json({
        success: false,
        message: `No case at id ${id}`,
      });
    }

    if (result[0]) {
      const { donations } = req.body;
      let TheAmountRequired = result[0].TheAmountRequired - donations;
      const query = `UPDATE cases SET TheAmountRequired=?,donations=? WHERE id=?;`;
      const data = [TheAmountRequired, donations, id];
      connection.query(query, data, (err, results) => {
        if (err) {
         
          return res.status(404).json({
            success: false,
            massage: `Server error`,
            err: err,
          });
        }
        if (results.changedRows == 0) {
          res.status(404).json({
            success: false,
            massage: `The cases: ${id} is not found`,
            err: err,
          });
        }

        res.status(201).json({
          success: true,
          massage: `cases updated`,
          results: results,
        });
      });
    }
  });
};
module.exports = {
  createNewCase,
  getAllCases,
  getCaseById,
  updateCaseById,
  deleteCaseById,
  getCasesByCategory,
  updateTheAmountRequired
};
