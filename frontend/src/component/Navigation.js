import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducer/login";
import { useNavigate } from "react-router-dom";
const Navigation = ({ setSearchCase, setCategory, setAllCase }) => {
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
  };

  return (
    <>
      <input
        id="searchInput"
        type="text"
        placeholder="Search here ...."
        onChange={(e) => {
          setSearchCase(e.target.value);
        }}
      />
      {state.isLoggedIn ? (
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
