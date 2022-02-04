import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { useNavigate } from "react-router-dom";
//////
const Register = () => {
  const navigate = useNavigate();
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
        navigate("/login");
      })
      .catch((err) => {
        setParagraph("Error happend while register, please try again");
      });
  };
  return (
    <>
      <div className="registerPage">
        <h1 className="registerWord">Register</h1>
        <br />
        <label className="firstNameLabel">First Name</label>
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="First Name"
          className="firstName"
        ></input>
        <br />
        <label className="lastNameLabel">Last Name</label>

        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="Last Name"
          className="lastName"
        ></input>
        <br />
        <label className="countryLabel">Country</label>

        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          placeholder="Country"
          className="country"
        ></input>
        <br />
        <label className="emailLabel">Email</label>

        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
          className="email"
        ></input>
        <br />
        <label className="passwordLabel">Password</label>

        <input
          onChange={(e) => {
            setPass(e.target.value);
          }}
          type="password"
          placeholder="Password"
          className="password"
        ></input>
        <br />

        <br />

        <button onClick={register} className="registerButton">
          Create account
        </button>
        <p>{paragraph}</p>
      </div>
    </>
  );
};

export default Register;
