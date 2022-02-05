import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../../reducer/donation";
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
const navigate=useNavigate()
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
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [details, setDetails] = useState([]);



  const getbyid = async () => {
    try {
      const result = await axios.get(`http://localhost:5000/cases/${id}`);
      setDetails(result.data.result);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getbyid();
  }, []);

  const getAllCases = async (num = 1) => {
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
      navigate(`/allcases`)
    } catch (error) {
      console.log(error);
    }
  };

  const addNewDonation = () => {
    axios
      .post(
        `http://localhost:5000/donation/${id}`,
        { IBAN, amount },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      )
      .then((result) => {
        // console.log(result.data.result);
        dispatch(addDonation({ IBAN, amount }));
        setMessage(" the donation has been created successfully");
      })
      .catch((err) => {
        console.log(err.response.data);
        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      {details &&
        details.map((element, i) => (
          <>
            <div key={i}>
              <br></br>
              <img src={element.case_image} />
              <p> {element.category}</p>
              <p> {element.case_description}</p>
              {/* {isAdmin? (
                <> */}
 
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
              <button
                className="delete"
                onClick={() => deleteCseById()}
              >
                X
              </button>
                {/* </>
              ) : (
                <></>
              )} */}
            </div>
            
          </>
        ))}

      {/* ) : (  */}
      <></>
      {/* )} */}
      {/* </div> */}
      {/* //  })} */}

      {/* ))} */}
      
      <br />
      <input
        type="text"
        placeholder="IBAN"
        onChange={(e) => {
          setIBAN(e.target.value);
        }}
      ></input>
      <br />

      <input
        type="text"
        placeholder="Amount"
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      ></input>
      <br />

      {/* need to put case_id as argument in line 57 */}
      <button
        onClick={() => {
          addNewDonation();
        }}
      >
        Donate
      </button>
      {message}
    </>
  );
};

export default NewDonation;
