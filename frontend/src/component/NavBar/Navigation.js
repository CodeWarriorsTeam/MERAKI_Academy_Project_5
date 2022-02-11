import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../reducer/login";
import { useNavigate } from "react-router-dom";
import { MdSettingsPhone, MdSearch } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiLogoutBoxLine } from "react-icons/ri";

import { RiLoginBoxLine } from "react-icons/ri";
import { FaRegRegistered } from "react-icons/fa";

import { BsFillHouseFill } from "react-icons/bs";
import "./Navigation.css";
import { IoLogoHackernews } from "react-icons/io";
const Navigation = ({
  isAdmin,
  setSearchCase,
  setCategory,
  setAllCase,
  userId,
  setUserId,
  setIsAdmin,
  setNum,
  numEducation,
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
    navigate(`/`);
    setUserId("");
    setIsAdmin(false);
  };
  console.log(isAdmin);
  return (
    <>
      {isAdmin ||
      (localStorage.getItem("isAdmin") == "admin" && state.isLoggedIn) ? (
        <>
          <nav className="nav">
            <Link className="safeHouseLink" to="/">
              <h2 className="titleLogo">
                <BsFillHouseFill className="iconHome"></BsFillHouseFill> SAFE
                HOUSE
              </h2>
            </Link>
            {/* <input
         id="searchInput"
         type="text"
         placeholder="Search here...."
         onChange={(e) => {
           setSearchCase(e.target.value);
         }}
       /> */}
            <ul className="ul">
              <li>
                <Link className="admin" to="/admin">
                  Dashboard
                </Link>
              </li>

              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <a>
                  {" "}
                  <RiLogoutBoxLine className="a" onClick={logout}>
                    Logout
                  </RiLogoutBoxLine>
                </a>
              </li>
            </ul>
          </nav>
        </>
      ) : (
        <>
          {" "}
          <nav className="nav">
            <Link className="safeHouseLink" to="/">
              {" "}
              <h2 className="titleLogo">
                <BsFillHouseFill className="iconHome"></BsFillHouseFill> SAFE
                HOUSE
              </h2>
            </Link>
            {/* <input
            id="searchInput"
            type="text"
            placeholder="Search here...."
            onChange={(e) => {
              setSearchCase(e.target.value);
            }}
          /> */}
            <ul className="ul">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <a href="">About Us</a>
              </li>
              <li>
                <a>Contribute with us</a>
                <ul className="drop">
                  <li>
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setAllCase(true);
                        setCategory(false);
                        setNum(1);
                      }}
                    >
                      All Cases
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`education`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`food`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      {" "}
                      Food
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`Rebuilding`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      {" "}
                      Rebuilding
                    </Link>{" "}
                  </li>
                  <li>
                    <Link
                      to="/allcases"
                      onClick={() => {
                        setCategory(`Medical Supplies`);
                        setAllCase(false);
                        setNum(1);
                      }}
                    >
                      {" "}
                      Medical Supplies
                    </Link>{" "}
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#volunteeringSection">Volunteer with us</a>
              </li>

              {state.isLoggedIn || userId ? (
                <li>
                  {" "}
                  <a id="Logout" onClick={logout}>
                    <RiLogoutBoxLine className="a"></RiLogoutBoxLine>{" "}
                  </a>
                </li>
              ) : (
                <>
                  <li>
                    <Link className="register" to="/register">
                      Register{" "}
                    </Link>
                  </li>
                  <li>
                    {" "}
                    <Link className="login" to="/login" title="Login">
                      Login{" "}
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </>
      )}

      {/* //////-----------//////////// */}
      {/* <div>
        <a className="num">
          <MdSettingsPhone className="phone" /> +00012345678
        </a>{" "}
        <a className="word">
          <HiOutlineMail className="email22" />
          safe.house@gmail.com
        </a>
      </div> */}
      {/* <nav className="NavBar">     */}
      {/* <div className="logo">
          <h1 id="headerLogo" className="animate__animated animate__bounce animate__infinites">Safe House</h1> 
        </div> */}

      {/* <a>
          <img
            className="logo"
            src="https://tse3.mm.bing.net/th?id=OIP.T9dXwfMb2pOdT1tuFBKYigHaGZ&pid=Api&P=0&w=201&h=174"
          />
        </a> */}
      {/* <Link className="safeHouseLink" to="/">
          {" "}
          <p className="safeHouse">SAFE HOUSE</p>
        </Link> */}
      {/* <MdSearch className="iconSearch"/>  */}

      {/* <Link to="/">
          <a className="Home">Home</a>
        </Link> */}
      {/* <Link
          to="/allcases"
          onClick={() => {
            setAllCase(true);
            setCategory(false);
            setNum(1);
          }}
        >
          <a id="AllCases">All Cases</a>{" "}
        </Link> */}
      {/* <Link
          to="/allcases"
          onClick={() => {
            setCategory(`education`);
            setAllCase(false);
            setNum(1);
          }}
        >
          <a className="education">Education</a>{" "}
        </Link> */}
      {/* <Link
          to="/allcases"
          onClick={() => {
            setCategory(`food`);
            setAllCase(false);
            setNum(1);
          }}
        >
          <a id="kids">Food</a>{" "}
        </Link> */}
      {/* <Link
          to="/allcases"
          onClick={() => {
            setCategory(`Rebuilding`);
            setAllCase(false);
            setNum(1)
          }}
        >
          <a id="kids">Rebuilding</a>{" "}
        </Link> */}
      {/* <Link
          to="/allcases"
          onClick={() => {
            setCategory(`Medical Supplies`);
            setAllCase(false);
            setNum(1)
          }}
        >
          <a id="kids">Medical Supplies</a>{" "}
        </Link> */}

      {/* {state.isLoggedIn || userId ? (
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
      )} */}

      {/* </nav> */}
    </>
  );
};
export default Navigation;
