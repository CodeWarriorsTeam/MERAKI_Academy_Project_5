import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCase } from "../../reducer/cases";

const NewCase = () => {
  const [case_image, setCase_Image] = useState("");
  const [category, setCategory] = useState("");

  const [title, setTitle] = useState("");
  const [TheAmountRequired,setTheAmountRequired] = useState("");
  const [case_description, setCase_Description] = useState("");

  const [message,setMessage] = useState("")


const dispatch = useDispatch();

const state = useSelector((state)=>{
    return {cases: state.casesReducer.cases,token:state.loginReducer.token}
})

  const addNewCase = ()=>{
      axios
      .post("http://localhost:5000/cases",{case_image,title,case_description,TheAmountRequired},{ headers: {
        Authorization: `Bearer ${state.token}`,
      }})

      .then((result)=>{
          dispatch(AddCase({case_image,title,case_description}))
          setMessage("the case has been created successfully")
          

      }).catch((err)=>{
        setMessage(err.response.data.message)
      })
  }

  return (
    <>
<br/>
<input type="text" placeholder="category" onChange={(e)=>{

setCategory(e.target.value);
    }}></input>

      <br />
      <input type="text" placeholder="Image" onChange={(e)=>{

  setCase_Image(e.target.value);
      }}></input>
      <br />

      <input type="text" placeholder="Title" onChange={(e)=>{
  setTitle(e.target.value)
      }}></input>
      <br />

      <input type="number" placeholder="Amount Required" onChange={(e)=>{
  setTheAmountRequired(e.target.value)
      }}></input>
      <br />
      
      <textarea type="text" placeholder="Description" onChange={(e)=>{
          setCase_Description(e.target.value);
      }}></textarea>
      <button onClick={addNewCase}>Add New Case</button>
      {message}
    </>
  );
};
export default NewCase;
