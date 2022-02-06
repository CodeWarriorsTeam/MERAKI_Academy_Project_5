import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <br /> <br /> <br />
      <header className="headerHome">
        <main className="main">
          <section className="whatDo">
            <h3 id="Welcome">Welcome To Safe House</h3>
            <h1 id="headerWhatDo">
              Donate for <span className="change_content"></span>
            </h1>
            <p id="prgWhatDo">
              {" "}
              If you do not have money, then smiling in the face of your brother
              is charity
            </p>
            <br /><br />
            <Link className="register" to="/register">
              <a id="Register">Register</a>
            </Link>
            <Link className="login" to="/login">
              <a id="Login">Login</a>
            </Link>
          </section>
        </main>
      </header>
    </>
  );
};

export default Home;
