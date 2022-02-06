import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import "./AllCases.css";

const AllCases = ({ searchCase, categoryNav, allCase, isAdmin }) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [category, setCategory] = useState("");

  const [num, setNum] = useState(1);
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
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      setMessage("no cases yet");
      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };
  const handleUpdateClick = (element) => {
    setUpdateBox(!updateBox);
    setCaseId(element.id);
    setCategory(element.category);
    setTitle(element.title);
    setCase_image(element.case_image);
    setCase_Description(element.case_description);
    if (updateBox) updateCaseById(element.id);
  };
  const updateCaseById = async (id) => {
    try {
      const result = await axios.put(`http://localhost:5000/cases/${id}`, {
        case_image,
        title,
        case_description,
        category,
      });

      dispatch(updateCases(result.data.results));

      getAllCases();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCseById = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/cases/${id}`);
      dispatch(deleteCase(id));
      getAllCases();
    } catch (error) {
      console.log(error);
    }
  };

  const convertToCase = (id) => {
    navigate(`/casedetails/${id}`);
  };

  const getAllCasesByCategory = async () => {
    try {
      // console.log(number);
      const res = await axios.get(
        `http://localhost:5000/cases/page/category?page=${num}&category=${categoryNav}
 `,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      if (res.data.success) {
        dispatch(setCases(res.data.result));
      }
    } catch (error) {
      setMessage("no cases yet");
      if (!error) {
        return setMessage(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    getAllCasesByCategory();
  }, [categoryNav,num]);

  useEffect(() => {
    if (allCase) {
      getAllCases();
    }
  }, [allCase,num]);
  return (
    <>
    <br /><br /><br />
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

                {/* <p>donations:{element.donations}</p> */}
                {/* {casee.user === userId && ( */}
                {/* {isAdmin ? ( */}
            
                <>
                  <>
                    {updateBox && caseId === element.id && (
                      <form>
                        <input
                          type="text"
                          defaultValue={element.case_description}
                          onChange={(e) => setCase_Description(e.target.value)}
                        ></input>
                        <input
                          type="text"
                          defaultValue={element.title}
                          onChange={(e) => setTitle(e.target.value)}
                        ></input>
                        <input
                          type="text"
                          defaultValue={element.category}
                          onChange={(e) => setCategory(e.target.value)}
                        ></input>
                        <input
                          type="text"
                          defaultValue={element.case_image}
                          onChange={(e) => setCase_image(e.target.value)}
                        ></input>
                      </form>
                    )}
                  </>
                   
                   {/* <button
                    className="update"
                    onClick={() => handleUpdateClick(element)}
                  >
                    update
                  </button> */}
                  {/* <button
                    className="delete"
                    onClick={() => deleteCseById(element.id)}
                  >
                    X
                  </button>  */}
                </>
                 {/* ) : (
            <></>  */}
                
              </div>
            </>
          ))}
                </div>

      <button
        onClick={ () => {
          setNum(num-1);
       
        }}
      >
        back
      </button>
      <button
        onClick={ () => {
          setNum(num+1);
    
        }}
      >
        next
      </button>

      {message && <div>{message}</div>}
    </>
  );
};

export default AllCases;
