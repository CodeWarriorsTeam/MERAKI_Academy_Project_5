import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import loginReducer from "../reducer/login";
import { logoutUser } from "../reducer/login";

const Navigation = () => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const logout = () => {
    state.isLoggedIn = false;
    localStorage.clear();
    dispatch(logoutUser());
  };

  return (
    <>
      {state.isLoggedIn ? (
        <>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <Link className="register" to="/register">
            Register
          </Link>

          <Link className="login" to="/login">
            Login
          </Link>
        </>
      )}
    </>
  );
};
export default Navigation;
