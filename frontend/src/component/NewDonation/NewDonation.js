import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../../reducer/donation";
import "./NewDonation.css";
import { useParams } from "react-router-dom";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
const NewDonation = ({ isAdmin }) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
      donations: state.donationReducer.donations,
    };
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [userId, setUserId] = useState("");
  const [case_image, setCase_image] = useState("");
  const [title, setTitle] = useState("");
  const [case_description, setCase_Description] = useState("");
  const [category, setCategory] = useState("");

  const [IBAN, setIBAN] = useState("");
  const [donations, setDonations] = useState("");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState([]);
  const [isClosed, setIsClosed] = useState(true);
  const getbyid = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/cases/${id}`);
      setDetails(result.data.result);
      console.log(result.data.result);
      setIsClosed(result.data.result[0].TheAmountRequired)
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getbyid();
  }, []);

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
    console.log("res", id);
    console.log("gggg");
    console.log(id);
    try {
      const result = await axios.put(`http://localhost:5000/cases/${id}`, {
        case_image,
        title,
        case_description,
        category,
      });
      console.log(result.data.results);
      dispatch(updateCases(result.data.results));

      getbyid();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCseById = async () => {
    try {
      await axios.delete(`http://localhost:5000/cases/${id}`);
      dispatch(deleteCase(id));
      getbyid();
      navigate(`/allcases`);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDonation = () => {
    axios
      .put(
        `http://localhost:5000/cases`,
        { id, donations },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        // console.log(result.data.result);
        dispatch(addDonation({ id, donations }));
        setMessage(" the donation has been created successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />
      {details &&
        details.map((element, i) => (
          <>
          
            <div key={i}>
              <br></br>
              <img src={element.case_image} />
              <p> category: {element.category}</p>
              <p>title: {element.title}</p>
              <p>description: {element.case_description}</p>
              {isAdmin ? (
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
                  <button
                    className="update"
                    onClick={() => handleUpdateClick(element)}
                  >
                    update
                  </button>
                  <button className="delete" onClick={() => deleteCseById()}>
                    X
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </>
     
      ))
        
        
        
       }

    

      <br />
      <>
      {isClosed?( <div className="contenerDonation">
          <input type="checkbox" id="inputOpenDonation"></input>

          <label for="inputOpenDonation" className="btn">
            Donate
          </label>
          <div className="modalDonation">
            <label for="inputOpenDonation" className="closeModal">
              X
            </label>

            <h1 id="headerModal">Thanks</h1>
            <p id="prgModel">
              {" "}
              If you do not have money, then smiling in the face of your brother
              is charity
            </p>
            <input
              className="IBAN"
              type="text"
              placeholder="IBAN"
              onChange={(e) => {
                setIBAN(e.target.value);
              }}
            ></input>
            <br />

            <input
              className="IBAN"
              type="text"
              placeholder="Amount"
              onChange={(e) => {
                setDonations(e.target.value);
              }}
            ></input>
            <br />

            <button
              className="addDonation"
              onClick={() => {
                addNewDonation();
              }}
            >
              Donate
            </button>
            {message}
            <label for="inputOpenDonation" className="btn close">
              Close
            </label>
          </div>
        </div>):(<>Close</>)}
       
      </>
    </>
  );
};

export default NewDonation;
