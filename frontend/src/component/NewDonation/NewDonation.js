import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addDonation } from "../../reducer/donation";
import { useParams } from "react-router-dom";

const NewDonation = () => {
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      cases: state.casesReducer.cases,
      donations: state.donationReducer.donations,
    };
  });

  const { id } = useParams();

  const dispatch = useDispatch();

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
        console.log(result.data.result);
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
        details.map((element) => (
          <>
          <br></br>
          <img 
              src={element.case_image} />
            <p> {element.category}</p>
            <p> {element.case_description}</p>
          </>
        ))}

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
