import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import { Link } from "react-router-dom";
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
    <br /><br /><br />
      <div className="registerPage">
      <br /> 
        <h1 className="signup">Sign Up</h1>
        <h5 className="account">Signup your account</h5>
        <br></br>
     
        <input
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          placeholder="First Name"
          className="firstName"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          placeholder="Last Name"
          className="lastName"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          type="text"
          placeholder="Country"
          className="country"
        ></input>
        <br />
        <br />
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email"
          className="email"
        ></input>
        <br />
        <br />
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
         Sign Up
        </button>
        <br></br>
        <p>{paragraph}</p>
        <br></br>
        <p className="sent">Already have an account?  <Link className="login" to="/login" className="link">
           Return to Sign In
          </Link></p>
      </div>
    </>
  );
};

export default Register;
