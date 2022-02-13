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
    navigate("/");
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

        localStorage.setItem("isAdmin", result.data.result[0].role_name);
      })

      .catch((err) => {
        console.log(err.response.data.message);

        setMessage(err.response.data.message);
      });
  };

  return (
    <>
    
      <div className="loginpage">
        <br />
        <div className="sss">
        {" "}  
        <p className="newhere">New Here?</p>  
        <p className="wordSign">sign up and  discover a great amount loads of new cases</p>
        <br /><br /></div>
      <br />
        {/* <h1 ></h1> */}
        <h1 className="sign">Login to Your Account</h1>
        <h3 className="signgoogle">Login using google</h3>
        <br></br>
        <GoogleLogin
          className="google"
          clientId="776623589420-erpi2vgpt6n8ncgv3gqc7ddcpphibjs5.apps.googleusercontent.com"
          buttonText="sign in with google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />{" "}
        <br></br>
        <p className="or">------------------------OR-----------------------</p>
        <input
          type="text"
          className="emai"
          placeholder=" Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <br /> <br />
        <input
          type="password"
          placeholder=" Password"
          className="pass"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        ></input>
        <br />
        <button className="but" onClick={login}>
          Sign In
        </button>
        <br />
        <div className="message">{message}</div>
        <br />
        {/* <br />  <br /> */}
        <button className="sent">
          <Link to="/register" className="link">
          Sign up
          </Link>
        </button>
       
      </div>
    
    </>
  );
};
export default Login;
