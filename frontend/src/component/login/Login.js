import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducer/login";
import "./Login.css";

const Login = ({ setIsAdmin }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = { email, pass };

  const login = ({ setIsAdmin }) => {
    axios
      .post("http://localhost:5000/login", userLogin)

      .then((result) => {
        dispatch(loginUser(result.data.token));
        navigate("/allcases");
        localStorage.setItem("token", result.data.token);
        setIsAdmin(result.data.role_Name === "ADMIN");
      })

      .catch((err) => {
        return setMessage("err.response.data.message");
      });
  };

  return (
    <div className="loginpage">
      <br /> <br />
      <h1 className="sign">Sign In</h1>
      <h5 className="account">Sign in to your account</h5>
      <input
        type="text"
        className="emai"
        placeholder=" E-mail"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <br /> <br />
      <input
        type="password"
        placeholder="Password"
        className="pass"
        onChange={(e) => {
          setPass(e.target.value);
        }}
      ></input>
      <br />
      <br />
      <br />
      <button className="but" onClick={login}>
        LOGIN
      </button>
     
      <p className="sent">Don't have an account?   <Link className="register" to="/register" className="link">
           Create account
          </Link></p>
     
       
    </div>
  );
};
export default Login;
