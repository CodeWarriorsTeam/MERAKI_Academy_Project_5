const connection = require("../database/db");

const addImageToGallery = (req, res) => {
   
     const { image_1} = req.body;
     
     const query = `INSERT INTO gallery (image_1) VALUES (?);`;
   
     const data = [image_1];
   
     connection.query(query, data, (err, result) => {
       if (err) {
       return  res.status(500).json({
           success: false,
           message: `Server Error`,
         });
       }
   
    return res.status(201).json({
         success: true,
         message: `add image`,
         result:result
       });
     });
   };


   const getAllImage = (req, res) => {
    // const limit = 6;
    // const page = req.query.page;
    // const offset = (page - 1) * limit;
    const query = `SELECT * FROM gallery   WHERE gallery.is_deleted=0  `;
  
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
          message: `no image yet`,
        });
      }
  
      res.status(200).json({
        success: true,
        message: `all image`,
        result: result,
      });
    });
  };
 
   module.exports={addImageToGallery ,getAllImage}