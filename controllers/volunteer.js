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

const getAllVolunteers = (req,res)=>{

    const query = `SELECT * FROM volunteer WHERE is_deleted=0`;

    connection.query(query,(err,result)=>{


        if (err){
             return res.status(500).json({
                 success:false,
                 message: `Server Error`
             }) 
        }


        if (!result[0]){
            return  res.status(200).json({
                success: false,
                message: `no volunteers yet`
            })
        }


        res.status(200).json({
            success:true,
            message: `All Volunteers`,
            result:result
        })
    })
    

}


module.exports = {
    createNewVolunteer,
    getAllVolunteers
}

