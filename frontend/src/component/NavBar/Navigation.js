import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
const Navigation = ({
  setSearchCase,
  setCategory,
  setAllCase,
  userId,
  setUserId,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => {
    return { isLoggedIn: state.loginReducer.isLoggedIn };
  });

  const logout = () => {
    state.isLoggedIn = false;
    localStorage.clear();
    dispatch(logoutUser());
    navigate(`/login`);
    setUserId("");
  };

  return (
    <>
      <nav className="NavBar">
        <div className="logo">
          <h1 id="headerLogo" className="animate__animated animate__bounce animate__infinites	">Safe House</h1>
        </div>
        <div className="menu">
          <input
            id="searchInput"
            type="text"
            placeholder="Search here ...."
            onChange={(e) => {
              setSearchCase(e.target.value);
            }}
          />
          <Link to="/">
            <a id="Home">Home</a>
          </Link>
          <Link
            to="/allcases"
            onClick={() => {
              setAllCase(true);
              setCategory(false);
            }}
          >
            <a id="AllCases">AllCases</a>{" "}
          </Link>
          <Link
            to="/allcases"
            onClick={() => {
              setCategory(`education`);
              setAllCase(false);
            }}
          >
            <a id="education">education</a>{" "}
          </Link>
          <Link
            to="/allcases"
            onClick={() => {
              setCategory(`kids`);
              setAllCase(false);
            }}
          >
            <a id="kids">kids</a>{" "}
          </Link>
          <Link className="newcase" to="/newcase">
            <a id="newCase">New Case</a>{" "}
          </Link>

          <></>
          {state.isLoggedIn || userId ? (
            <a id="Logout" onClick={logout}>
              Logout
            </a>
          ) : (
            <>
              <Link className="register" to="/register">
                <a id="RegisterNav">Register</a>
              </Link>
              <Link className="login" to="/login">
                <a id="LoginNav">Login</a>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
};
export default Navigation;
