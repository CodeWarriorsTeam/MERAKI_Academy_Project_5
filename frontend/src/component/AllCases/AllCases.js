import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";

const AllCases = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const dispatch = useDispatch();

  //  category VARCHAR(255),
  // case_image VARCHAR(255),
  // title VARCHAR(255),
  // case_description VARCHAR(255)

  const [category, setCategory] = useState("");
  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");

  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");

  const getAllCases = async (num = 1) => {
    console.log(state.token);
    try {
      console.log(999988);
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${1}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        console.log(6666);
        console.log("res", res);
        console.log(res.data.message);
        dispatch(setCases(res.data.result));
       
      } 
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
            <p>TheAmountRequired:{element.TheAmountRequired}</p>
            <p>donations:{element.donations}</p>

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
