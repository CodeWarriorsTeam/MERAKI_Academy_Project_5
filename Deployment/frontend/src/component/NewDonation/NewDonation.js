import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../../reducer/donation";
import "./NewDonation.css";
import Model from "react-modal";
import { FcDonate } from "react-icons/fc";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
///BsFillTelephoneOutboundFill
import { SiMinutemailer } from "react-icons/si";
import { BsFillTelephoneOutboundFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import {
  setCases,
  updateCases,
  deleteCase,
  setCase,
} from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import StripeContainer from "../StripeContainer";
import PaymentForm from "../PaymentForm";

const NewDonation = ({
  isAdmin,
  numFood,
  setNumFood,
  setNumRebuilding,
  numRebuilding,
  setNumEducation,
  numEducation,
  setNumMedicalSupplies,
  numMedicalSupplies,
}) => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
      caseById: state.casesReducer.caseById,
      donations: state.donationReducer.donations,
    };
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showItem, setShowItem] = useState(false);
  const [updateBox, setUpdateBox] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [donateIsOpen, setDonateIsOpen] = useState(false);
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
      dispatch(setCase(result.data.result));

      console.log(result.data.result[0].title);
      setIsClosed(result.data.result[0].TheAmountRequired);
    } catch (error) {
      console.log(error.response);
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
  const customStyles2 = {
    content: {
      //   background: "rgba(yellow, 0, 0, 0.7)",
      top: "50%",
      left: "50%",
      right: "60%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // --------------
  const countNumFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntFood
 `
      );

      if (res.data.success) {
        setNumFood(res.data.result[0].countFood);
      }
    } catch (error) {}
  };
  ////------
  const countNumRebuilding = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntReb
 `
      );

      if (res.data.success) {
        setNumRebuilding(res.data.result[0].CountRebuilding);
      }
    } catch (error) {}
  };

  ///-------------
  ///-----
  const countNumEducation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntEdu
 `
      );

      if (res.data.success) {
        setNumEducation(res.data.result[0].countEducation);
      }
    } catch (error) {}
  };
  ///--
  //-----
  const countNumMedSupplies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntMedSupp
`
      );

      if (res.data.success) {
        setNumMedicalSupplies(res.data.result[0].CountMedSupplies);
      }
    } catch (error) {}
  };
  //--
  useEffect(() => {
    getbyid();
    countNumFood();
    countNumEducation();
    countNumRebuilding();
    countNumMedSupplies();
  }, []);
  return (
    <>
      <div className="wrapperCase">
        {state.caseById &&
          state.caseById.map((element, i) => (
            <>
              <img
                className="leftSide"
                src={element.case_image}
                alt="caseImage"
                width="100%"
              />

              {/* {element.category.toLowerCase() == "food" ? (
                  <>
                    <p>
                      Help us reach the goal, feed<span> 1,000 </span>poor
                      people
                    </p>
                    <p>
                      We have achieved so far<span> {numFood}</span>
                    </p>
                    <p>
                      The remaining <span>{1000 - numFood}</span>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {element.category.toLowerCase() == "rebuilding" ? (
                  <>
                    <p>
                      Help us reach the goal, Repairing<span> 500</span>{" "}
                      facilities that were destroyed due to the war
                    </p>
                    <p>
                      We have achieved so far<span> {numRebuilding}</span>
                    </p>
                    <p>
                      The remaining <span>{500 - numRebuilding}</span>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {element.category.toLowerCase() == "education" ? (
                  <>
                    <p>
                      Help us reach the goal, Educating<span> 1000</span>{" "}
                      students
                    </p>
                    <p>
                      We have achieved so far<span> {numEducation}</span>
                    </p>
                    <p>
                      The remaining <span>{1000 - numEducation}</span>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                {element.category.toLowerCase() == "medical supplies" ? (
                  <>
                    <p>
                      Help us reach the goal, Educating<span> 1000</span>{" "}
                      students
                    </p>
                    <p>
                      We have achieved so far<span> {numMedicalSupplies}</span>
                    </p>
                    <p>
                      The remaining <span>{1000 - numMedicalSupplies}</span>
                    </p>
                  </>
                ) : (
                  <></>
                )}
                <br /> */}
              {/*  <h4>Case</h4>
                <p>{element.title}</p> */}

              <div className="rightSide">
                <div className="infoCase">
                  <h3>Case Details</h3>
                  <div className="case_data">
                    <div className="data">
                      <h4>Category</h4>
                      <p>{element.category}</p>
                    </div>
                    <div
                      className="data"
                      style={{
                        width: "80%",
                        wordBreak: "break-all",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      <h4>Case</h4>
                      <p>{element.title}</p>
                    </div>
                    <div className="data">
                      <h4>Description</h4>
                      <div style={{ width: "200%", wordBreak: "break-all" }}>
                        {" "}
                        <p>{element.case_description}</p>
                      </div>
                    </div>
                    <div className="data">
                      <h4>Required</h4>
                      <p>{element.TheAmountRequired}$</p>
                    </div>
                  </div>
                </div>

                <div className="donateForCase">
                  <ul>
                    {isClosed && isClosed > 0 ? (
                      <>
                        {showItem ? (
                          <StripeContainer />
                        ) : (
                          <>
                            <li title="DonateNow">
                              <a
                                onClick={() => {
                                  setShowItem(true);
                                }}
                              >
                                <FcDonate></FcDonate>
                              </a>
                            </li>
                          </>
                        )}
                      </>
                    ) : (
                      <>
                        <li
                          style={{
                            background:
                              "linear-gradient(to right ,#055302,#27d1189a) ",
                          }}
                        >
                          {" "}
                          <a title="Close case">
                            <IoCheckmarkDoneSharp></IoCheckmarkDoneSharp>
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                <div className="infoCompany">
                  {/* <h3>To Contact Us</h3> */}
                  <div className="info_data">
                    <div className="data">
                      {/* <h4>Email</h4> */}
                      <p>
                        <span>
                          <SiMinutemailer></SiMinutemailer>{" "}
                        </span>{" "}
                        safeHouse@official.edj
                      </p>
                    </div>
                    <div className="data">
                      {/* <h4>Phone</h4> */}
                      <p>
                        <span>
                          <BsFillTelephoneOutboundFill></BsFillTelephoneOutboundFill>
                        </span>{" "}
                        06-555555
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* {isAdmin ? (
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
              )} */}
            </>
          ))}

        <>
          {/* {isClosed && isClosed > 0 ? (
            <div className="contenerDonation">
              <Model
                style={customStyles2}
                isOpen={donateIsOpen}
                onRequestClose={() => setDonateIsOpen(false)}
              >
                <input type="checkbox" id="inputOpenDonation"></input>
                <div className="modalDonation">
                  <h1 id="headerModal">Thanks</h1>
                  <p id="prgModel">
                    {" "}
                    If you do not have money, then smiling in the face of your
                    brother is charity
                  </p>
                  <br></br>
                  <input
                    className="IBAN"
                    type="text"
                    placeholder="card"
                    onChange={(e) => {
                      setIBAN(e.target.value);
                    }}
                  ></input>{" "}
                  <br />
                  <br />
                  <input
                    className="IBAN"
                    type="text"
                    placeholder="Enter Donation Amount"
                    onChange={(e) => {
                      setDonations(e.target.value);
                    }}
                  ></input>
                  <button
                    className="addDonation"
                    onClick={() => {
                      addNewDonation();
                    }}
                  >
                    Donate
                  </button>
                  {message}
                </div>
              </Model>
            </div>
          ) : (
            <>Close</>
          )} */}
        </>
      </div>
    </>
  );
};

export default NewDonation;
