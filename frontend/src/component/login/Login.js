import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducer/login";
import "./Login.css";
import GoogleLogin from 'react-google-login';

const Login = ({ setIsAdmin }) => {

  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn,token:state.loginReducer.token };
  });


  const responseGoogle = (response) => {
    state.token = response.tokenObj.id_token
    console.log(response);
    console.log(response.profileObj);
    navigate("/allcases")
  }



  const dispatch = useDispatch();



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
    <>
    <div className="loginpage">
      <br /> 
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
    
    <GoogleLogin
    clientId="776623589420-erpi2vgpt6n8ncgv3gqc7ddcpphibjs5.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,
    </>
  );
};
export default Login;
