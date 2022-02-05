import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
const Navigation = ({ setSearchCase, setCategory, setAllCase,userId,setUserId }) => {
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
    setUserId("")

  };

  return (
    <>
    <header>
      <nav>
        <div className="logo"> <h1 className="headerLogo">Safe House</h1></div>
        <div className="menu"></div>
      <input
        id="searchInput"
        type="text"
        placeholder="Search here ...."
        onChange={(e) => {
          setSearchCase(e.target.value);
        }}
      />
      <>
        <Link
          to="/allcases"
          onClick={() => {
            setAllCase(true);
            setCategory(false);
          }}
        >
          {" "}
          AllCases{" "}
        </Link>
        <Link
          to="/allcases"
          onClick={() => {
            setCategory(`education`);
            setAllCase(false);
          }}
        >
          education{" "}
        </Link>

        <Link
          to="/allcases"
          onClick={() => {
            setCategory(`kids`);
            setAllCase(false);
          }}
        >
          kids{" "}
        </Link>
        {/* <Link className="home" to="/allcases">
            Cases
          </Link>{" "} */}
        <Link className="newcase" to="/newcase">
          New Case
        </Link>
      </>
      {state.isLoggedIn || userId ? <button onClick={logout}>Logout</button> : <> <Link className="register" to="/register">
            Register
          </Link>

          <Link className="login" to="/login">
            Login
          </Link></>}
          </nav>
          </header>
    </>
  );
};
export default Navigation;
