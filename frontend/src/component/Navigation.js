import React from "react";
import { Link } from "react-router-dom";
const Navigation = () => {
    return (
        <>
        <Link className="register" to="/register">
              Register
            </Link>

            <Link className="login" to="/login">
              Login
            </Link>
        </>
    )
}
export default Navigation