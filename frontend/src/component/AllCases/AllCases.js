import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import "./AllCases.css";

const AllCases = ({
  searchCase,
  categoryNav,
  allCase,
  isAdmin,
  setNum,
  num,
  setNumEducation,
  numEducation,
}) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");

  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");

  const getAllCases = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${num}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      console.log(res.data.result);
      if (!res.data.result) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  const countNumEducation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cunt
 `
      );
      console.log(res.data.result[0].countEducation);
      
      if (res.data.success) {
        setNumEducation(res.data.result[0].countEducation)
      }
    } catch (error) {
      

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  const convertToCase = (id) => {
    navigate(`/casedetails/${id}`);
  };

  const getAllCasesByCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/cases/page/category?page=${num}&category=${categoryNav}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );

      if (!res.data.result) {
        if (num == 0) {
          setNum(num + 1);
        } else {
          setNum(num - 1);
        }
      }
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      if (num == 0) {
        setNum(num + 1);
      } else {
        setNum(num - 1);
      }

      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    if (categoryNav) {
      getAllCasesByCategory();
    }
  }, [categoryNav, num]);

  useEffect(() => {
    if (allCase) {
      getAllCases();
    }
  }, [allCase, num]);
  useEffect(() => {
    countNumEducation();
  }, [numEducation]);
  return (
    <>
      <br />
      <br />
      <br />
      <div className="case">
        {state.cases &&
          state.cases
            .filter((caseInformation) => {
              if (searchCase == "") {
                return caseInformation;
              } else if (
                caseInformation.category
                  .toLowerCase()
                  .includes(searchCase.toLowerCase()) ||
                caseInformation.title
                  .toLowerCase()
                  .includes(searchCase.toLowerCase())
              ) {
                return caseInformation;
              }
            })
            .map((element, i) => (
              <>
                <div key={i} className="test">
                  <br />
                  <img
                    className="allcasesImage"
                    onClick={() => {
                      convertToCase(element.id);
                    }}
                    src={element.case_image}
                  />

                  <p className="allcasesTitle">{element.title}</p>

                  <p className="TheAmountReguired">
                    TheAmountRequired:{element.TheAmountRequired}$
                  </p>
                  {element.TheAmountRequired &&
                  element.TheAmountRequired > 0 ? (
                    <>Available</>
                  ) : (
                    <p>close</p>
                  )}
                </div>
              </>
            ))}
      </div>

      {num == 1 ? (
        <></>
      ) : (
        <button
          onClick={() => {
            setNum(num - 1);
          }}
        >
          back
        </button>
      )}
      <button
        onClick={() => {
          setNum(num + 1);
        }}
      >
        next
      </button>

      {message && <div>{message}</div>}
    </>
  );
};

export default AllCases;
