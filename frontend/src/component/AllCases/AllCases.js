import React, { useEffect, useState } from "react";
import axios from "axios";
import { setCases } from "../../reducer/cases";
import { useDispatch, useSelector } from "react-redux";
const AllCases = (token) => {
  const [casee, setCase] = useState("");
  const [category, setCategory] = useState("");
  const [case_image, setCase_Image] = useState("");
  const [title, serTitle] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });
  useEffect(() => {
    getAllCases();
  }, []);
  const getAllCases = async (num = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${num}
`,
        { headers: { Authoriztion: `bearer ${token}` } }
      );
      if (res.data.success) {
        dispatch(setCases(res.date.message));
        setCase(res.data.cases);
      } else throw Error;
    } catch (error) {
      if (!error) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  return (
    <>
      {state.cases &&
        state.cases.map((casee, i) => {
          <div key={i} className="case">
            <div>{casee.title}</div>
            <div>{casee.case_image}</div>
            <div>{casee.case_description}</div>
          </div>;
        })}
      {message && <div>{message}</div>}
    </>
  );
};

export default AllCases;
