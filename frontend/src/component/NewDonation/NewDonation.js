import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../../reducer/donation";
import "./NewDonation.css";
import Model from "react-modal";
import { useParams } from "react-router-dom";
import { setCases, updateCases, deleteCase } from "../../reducer/cases/index";
import { useNavigate } from "react-router-dom";
import StripeContainer from "../StripeContainer";
import PaymentForm from "../PaymentForm";

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
      setDetails(result.data.result);
      console.log(result.data.result[0].title);
      setIsClosed(result.data.result[0].TheAmountRequired);
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

  return (
    <>
      <br />
      <br />
      <br />
      {details &&
        details.map((element, i) => (
          <>
            <div className="detailpage" key={i}>
              {/* <br></br> */}
              <img src={element.case_image} className="image3" />
              {/* <p className="category3"> category: {element.category}</p> */}
              <p className="title3"> {element.title}</p>
              <p className="amount3">{element.TheAmountRequired}$</p>
              <p className="description3">{element.case_description}</p>
              {isClosed && isClosed > 0 ? (
                <>
                  {showItem ? (
                    <StripeContainer />
                  ) : (
                    <>
                      <button
                        className="Pay"
                        onClick={() => {
                          setShowItem(true);
                        }}
                      >
                        Donate Now
                      </button>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}
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
        ))}
      <>
        {isClosed && isClosed > 0 ? (
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
        )}
      </>
    </>
  );
};

export default NewDonation;
