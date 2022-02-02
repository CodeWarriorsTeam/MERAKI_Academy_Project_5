import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
    return (
        <>
        <Link className="register" to="/register">
              Register
            </Link>
            <Link className="home" to="/allcases">
              Home

            <Link className="login" to="/login">
              Login
            </Link>
        </>
    )
}
export default Navigation