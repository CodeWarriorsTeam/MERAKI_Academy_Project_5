import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import "./Home.css";

const Home = ({setCategory,setAllCase,numEducation,numFood,setNumFood,setNumEducation,setNumRebuilding,numRebuilding,setNumMedicalSupplies,numMedicalSupplies}) => {

  const countNumEducation = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntEdu
 `
      );
    
      
      if (res.data.success) {
        setNumEducation(res.data.result[0].countEducation)
      }
    } catch (error) {
      

   
    }
  };

  const countNumFood = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntFood
 `
      );
      
      
      if (res.data.success) {
        setNumFood(res.data.result[0].countFood)
      }
    } catch (error) {
      

    
    }
  };
  const countNumRebuilding = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntReb
 `
      );
      
      
      if (res.data.success) {
        setNumRebuilding(res.data.result[0].CountRebuilding)
      }
    } catch (error) {
      

   
    }
  };

  const countNumMedSupplies = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/admin/cuntMedSupp
 `
      );
    
      
      if (res.data.success) {
        setNumMedicalSupplies(res.data.result[0].CountMedSupplies)
      }
    } catch (error) {
      

   
    }
  };
  useEffect(() => {
    countNumEducation();
  }, []);
  useEffect(() => {
    countNumFood();
    }, []);
    useEffect(() => {
      countNumRebuilding();
      }, []);
      useEffect(() => {
        countNumMedSupplies();
        }, []);
 
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
            <div className="targetCount">Covered number for this moment:<span>{numFood}</span></div>
            <Link
          to="/allcases"
          onClick={() => {
            setCategory(`food`);
            setAllCase(false);
            
          }}
        > <button className="DonationNow">Donate Now</button></Link>
            </div>
            
            <div className="box"><div className="cardImage"></div>
            <div className="targetTitle">Repairing 500 facilities</div>
            <div className="targetCount">Covered number for this moment:<span>{numRebuilding} </span></div>
            <Link
          to="/allcases"
          onClick={() => {
            setCategory(`rebuilding`);
            setAllCase(false);
          }}
        >  <button className="DonationNow">Donate Now</button></Link>
            </div>

            <div className="box"><div className="cardImage"></div>
            <div className="targetTitle">Medical Supplies for 1000 person</div>
            <div className="targetCount">Covered number for this moment:<span>{numMedicalSupplies} </span></div>
            <Link
          to="/allcases"
          onClick={() => {
            setCategory(`Medical Supplies`);
            setAllCase(false);
           
          }}
        > <button className="DonationNow">Donate Now</button></Link>
            </div>
          </div>
        </div>
      </section>

    <section className="volunteering" id="volunteeringSection">

    <div className="coverVol"></div>

<div className="containerVolunteering">
  <div  className="volunteeringTitle">
  Volunteer with us
  </div>
  <div  className="volunteeringCont">
    <h3 className="ektabas">Be a volunteer to<br/> <strong> Make your presence in this life more beautiful</strong> </h3>
    <p className="prgVolunteering">
    When you do any volunteer work, you will not know the meaning of boredom. Everything in the world of volunteering is an exciting and new experience in all respects that takes you to wide horizons.
    </p>
    <button className="btnVolunteering">JOIN US</button>
  </div>
</div>

    </section>
    </>
  );
};

export default Home;
