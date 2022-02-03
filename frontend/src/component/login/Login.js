import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducer/login";

const Login = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const userLogin = { email, pass };

  const login = () => {
    axios
      .post("http://localhost:5000/login", userLogin)

      .then((result) => {
        dispatch(loginUser(result.data.token));
        navigate("/allcases");
        localStorage.setItem("token", result.data.token);
      })

      .catch((err) => {
        return setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <br />
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => {
          setPass(e.target.value);
        }}
      ></input>
      <br />
      <button onClick={login}>Login</button>
    </>
  );
};

export default Login;
