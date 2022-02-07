import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import { MdSettingsPhone, MdSearch } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import "./Navigation.css";
const Navigation = ({isAdmin,
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
      <div>
        <a className="num">
          <MdSettingsPhone className="phone" /> +00012345678
        </a>{" "}
        <a className="word">
          <HiOutlineMail className="email22" />
          safe.house@gmail.com
        </a>
      </div>
      {/* <nav className="NavBar">     */}
      {/* <div className="logo">
          <h1 id="headerLogo" className="animate__animated animate__bounce animate__infinites">Safe House</h1> 
        </div> */}
      <div className="menu">
        <a>
          <img
            className="logo"
            src="https://tse3.mm.bing.net/th?id=OIP.T9dXwfMb2pOdT1tuFBKYigHaGZ&pid=Api&P=0&w=201&h=174"
          />
        </a>
        <Link className="safeHouseLink" to="/">
          {" "}
          <p className="safeHouse">SAFE HOUSE</p>
        </Link>
        {/* <MdSearch className="iconSearch"/>  */}
        <input
          id="searchInput"
          type="text"
          placeholder="Search here...."
          onChange={(e) => {
            setSearchCase(e.target.value);
          }}
        />
        <Link to="/">
          <a className="Home">Home</a>
        </Link>
        <Link
          to="/allcases"
          onClick={() => {
            setAllCase(true);
            setCategory(false);
          }}
        >
          <a id="AllCases">All Cases</a>{" "}
        </Link>
        <Link
          to="/allcases"
          onClick={() => {
            setCategory(`education`);
            setAllCase(false);
          }}
        >
          <a className="education">Education</a>{" "}
        </Link>
        <Link
          to="/allcases"
          onClick={() => {
            setCategory(`kids`);
            setAllCase(false);
          }}
        >
          <a id="kids">Kids</a>{" "}
        </Link>
        <Link
          to="/allcases"
          onClick={() => {
            setCategory(`repair`);
            setAllCase(false);
          }}
        >
          <a id="kids">repair</a>{" "}
        </Link>
        {isAdmin ? (
          <>
          <Link className="admin" to="/admin">Admin Panel</Link>
            {/* <Link className="newcase" to="/newcase">
          <a id="newCase">New Case</a>{" "}
        </Link> */}</>
        ) : (
          <></>
        )}
      
      </div>
      <></>
      {state.isLoggedIn || userId ? (
        <a id="Logout" onClick={logout}>
          Logout
        </a>
      ) : (
        <>
          <Link className="register" to="/register">
            <a id="RegisterNav">Sign Up</a>
          </Link>
          <Link className="login" to="/login">
            Login
          </Link>
        </>
      )}

      {/* </nav> */}
    </>
  );
};
export default Navigation;
