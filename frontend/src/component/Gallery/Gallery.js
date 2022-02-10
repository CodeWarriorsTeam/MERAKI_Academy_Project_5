import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./Gallery.css";


const Gallery=()=>{
    const [gallery, setGallery] = useState([]);

    const getAllImage = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/gallery
     `
          );
        
          
          if (res.data.success) {
            setGallery(res.data.result)
          }
        } catch (error) {
          console.log(error);
    
       
        }
      };
console.log(gallery);
      useEffect(() => {
        getAllImage();
      }, []);
      return (<>
      <div className="gallery">
      {gallery &&
          gallery.map((element)=>(<>
          <div className="image_1">
              <img src={element.image_1}/>
          </div>
          
          <div className="image_2">
              <img src={element.image_2}/>
          </div>
          <div className="image_3">
              <img src={element.image_3}/>
          </div>
          
          </>))
          
          }
      </div>
     </>
      
   
      
      
      )
      
  
}




export default Gallery;