import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [paragraph, setParagraph] = useState("");
  const register = () => {
    axios
      .post(`http://localhost:5000/user`, {
        firstName,
        lastName,
        country,
        email,
        pass,
      })
      .then((result) => {
        setParagraph("The user has been created successfully");
      })
      .catch((err) => {
        setParagraph("Error happend while register, please try again");
      });
  };
  return (
    <>
      <div className="registerPage">
          <h1>Register</h1>
          <input
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            type="text"
            placeholder="firstName"
            className="firstName"
          ></input>
          <input
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            type="text"
            placeholder="lastName"
            className="lastName"
          ></input>
          <input
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            type="text"
            placeholder="Country"
            className="country"
          ></input>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Email"
            className="email"
          ></input>
          <input
            onChange={(e) => {
              setPass(e.target.value);
            }}
            type="password"
            placeholder="Password"
            className="password"
          ></input>
          <button onClick={register}></button>
          <p>{paragraph}</p>
        
      </div>
    </>
  );
};

export default Register;
