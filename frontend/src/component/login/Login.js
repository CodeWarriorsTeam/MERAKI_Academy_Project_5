import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../reducer/login";
import "./Login.css";
import GoogleLogin from "react-google-login";

const Login = ({ setIsAdmin, setUserId }) => {
  const state = useSelector((state) => {
    return {
      isLoggedIn: state.loginReducer.isLoggedIn,
      token: state.loginReducer.token,
    };
  });

  const responseGoogle = (response) => {
    state.token = response.tokenObj.id_token;
    console.log(response);
    setUserId(response.profileObj.googleId);
    console.log(response.profileObj.googleId);
    navigate("/allcases");
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");
  const userLogin = { email, pass };

  const login = () => {
    axios
      .post("http://localhost:5000/login", userLogin)

      .then((result) => {
        console.log(result.data.result);
        dispatch(loginUser(result.data.token));
        //  isAdmin ? navigate("/admin") : navigate("/allcases");

        setIsAdmin(result.data.result[0].role_name.toLowerCase() === "admin");
        navigate("/");
        localStorage.setItem("token", result.data.token);
        console.log(result.data.result[0].role_name);
        setIsAdmin(result.data.result[0].role_name.toLowerCase() === "admin");

        localStorage.setItem("isAdmin",result.data.result[0].role_name)

      })

      .catch((err) => {
        console.log(err.response.data.message);

        setMessage(err.response.data.message);
      });
  };

  return (
    <>
      <br />
      <br />
      <br />   <br />

      <div className="loginpage">
        <br />
        <h1 className="sign">Sign In</h1>
        <h5 className="account">Sign in to your account</h5>
        <br></br>
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
        <button className="but" onClick={login}>
          LOGIN
        </button>
        <br /> 
        <div className="message">{message}</div>
        <br />
       <GoogleLogin className="google"
        clientId="776623589420-erpi2vgpt6n8ncgv3gqc7ddcpphibjs5.apps.googleusercontent.com"
        buttonText="sign in with google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />  <br />  <br />
        <p className="sent">
          Don't have an account?{" "}
          <Link className="register" to="/register" className="link">
            Create account
          </Link>
        </p>
        <br></br>
      </div>

    
    </>
  );
};
export default Login;
