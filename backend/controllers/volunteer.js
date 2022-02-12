const connection = require ("../database/db");


const createNewVolunteer = (req,res)=>{

const {firstName,lastName,email,address_1,phonenumber}= req.body


const query = `INSERT INTO volunteer (firstName,lastName,email,address_1,phonenumber) VALUES (?,?,?,?,?);` ;


const data = [

    firstName,
    lastName,
    email,
    address_1,
    phonenumber
]
connection.query(query,data,(err,result)=>{

if (err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message: `Server Error`
    })
}



 res.status(201).json({
     success:true,
     message: `volunteer joined`,
     result: result
 })

})

}

module.exports = {
    createNewVolunteer
}

