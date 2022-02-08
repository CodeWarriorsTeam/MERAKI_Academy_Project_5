import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Home.css";

const Home = ({setCategory,setAllCase,numEducation}) => {
 
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
      <section className="target" id="targetSection">
        <div className="containerTarget">
          <h2 className="headerTarget">
          safe house target  for 2022
          </h2>
          <div className="boxContainer">
            <div className="box"><div className="cardImage"></div>
            <div className="targetTitle">Educating 1000 students</div>
            <div className="targetCount">Covered number for this moment:<span>{numEducation} </span></div>
            <Link
          to="/allcases"
          onClick={() => {
            setCategory(`education`);
            setAllCase(false);
          }}
        >  <button className="DonationNow">Donate Now</button></Link>
            </div>
    
            <div className="box"><div className="cardImage"></div>
            <div className="targetTitle">Feeding 1000 poor</div>
            <div className="targetCount">Covered number for this moment:<span>100 </span></div>
            <button className="DonationNow">Donate Now</button>
            </div>
            
            <div className="box"><div className="cardImage"></div>
            <div className="targetTitle">Repairing 500 facilities</div>
            <div className="targetCount">Covered number for this moment:<span>100 </span></div>
            <Link
          to="/allcases"
          onClick={() => {
            setCategory(`repair`);
            setAllCase(false);
          }}
        >  <button className="DonationNow">Donate Now</button></Link>
            </div>

            <div className="box"><div className="cardImage"></div>
            <div className="targetTitle">Medical Supplies for 1000 person</div>
            <div className="targetCount">Covered number for this moment:<span>100 </span></div>
            <button className="DonationNow">Donate Now</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
