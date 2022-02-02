import React, { useEffect, useState } from "react";
import axios from "axios";
import { setCases, updateCases,deleteCase } from "../../reducer/cases";
import { useDispatch, useSelector } from "react-redux";
const AllCases = (token) => {
  const [casee, setCase] = useState([]);
  const [category, setCategory] = useState("");
  const [case_image, setCase_Image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const getAllCases = async (num = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${num}
 `,
        { headers: { Authoriztion: `bearer ${state.token}` } }
      );
      if (res.data.success) {
        console.log("res",res);
        console.log(res.data.message);
        dispatch(setCases(res.data.message));
        setCase(res.data.cases);
      } else throw Error;
    } catch (error) {
      console.log(error);
      if (!error) {
        return setMessage(error.response.data.message);
      }
     
    }
  };
 
 




  const deleteCseById = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:5000/cases/${id}`);
      dispatch(deleteCase(id));
      getAllCases();


    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getAllCases();
  }, []);



  console.log(state.cases);
  return (
    <>
      {state.cases.map((element, i) => (
        // console.log(element.title);

        <>
          <div key={i} className="case">
            <p>{element.title}</p>
            <p>{element.case_image}</p>
            <p>{element.case_description}</p>

              
              


                <button
                  className="delete"
                  onClick={() => deleteCseById(element.id)}
                >
                  X
                </button>
            
            
            
          </div>
        </>
      ))}
      {message && <div>{message}</div>}
    </>
  );
};

export default AllCases;
