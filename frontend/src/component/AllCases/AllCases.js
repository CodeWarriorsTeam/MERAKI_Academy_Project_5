import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";

const AllCases = ({searchCase}) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
    };
  });

  const dispatch = useDispatch();

  const navigate = useNavigate()


  const [category, setCategory] = useState("");
  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");

  const [message, setMessage] = useState("");
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");

  const getAllCases = async (num = 1) => {
   
    try {
      
      const res = await axios.get(
        `http://localhost:5000/cases/page?page=${1}
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
  // const handleUpdateClick = (casee) => {
  //   setUpdateBox(!updateBox);
  //   setCaseId(casee.id);
  //   setCategory(casee.category)
  //   setTitle(casee.title);
  //   setCase_image(casee.case_image);
  //   setCase_Description(casee.case_description);
  //   if (updateBox) updateCaseById(casee.id);
  // };
  const updateCaseById = async (id) => {
 
    try {
     const result =await axios
        .put(`http://localhost:5000/cases/${id}`, {
          case_image,
          title,
          case_description,
          category,
        })
      
        
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


const convertToCase = (id)=>{


  navigate(`/casedetails/${id}`)
}



  useEffect(() => {
    getAllCases();
  }, []);

 
  return (
    <>
      {state.cases &&
        state.cases.filter((caseInformation)=>{
          if(searchCase==""){
            return caseInformation
          }else if(caseInformation.category .toLowerCase()
          .includes(searchCase.toLowerCase())||caseInformation.title .toLowerCase()
          .includes(searchCase.toLowerCase())
          ){return caseInformation}
        }).map((element, i) => (
      

        <>
          <div key={i} className="case">
              <img onClick={()=>{
                convertToCase(element.id)
              }} src={element.case_image} />
               <p>{element.title}</p>

            <p>TheAmountRequired:{element.TheAmountRequired}</p>
              {/* <p>donations:{element.donations}</p> */}
            {/* {casee.user === userId && ( */}
              <>
                {/* {updateBox && caseId === casee.id && ( */}
                <form>
                    <input
                      type="text"
                      defaultValue={state.cases.case_description}
                      onChange={(e) => setCase_Description(e.target.value)}
                    ></input>
                    <input
                      type="text"
                      defaultValue={state.cases.title}
                      onChange={(e) => setTitle(e.target.value)}
                    ></input>
                    <input
                      type="text"
                      defaultValue={state.cases.category}
                      onChange={(e) => setCategory(e.target.value)}
                    ></input>
                    <input
                      type="text"
                      defaultValue={state.cases.case_image}
                      onChange={(e) => setCase_image(e.target.value)}
                    ></input>
                </form>
                {/* )} */}
              </>
            {/* )} */}
            <button className="update" onClick={() => updateCaseById(element.id)}>
              update
            </button>
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
