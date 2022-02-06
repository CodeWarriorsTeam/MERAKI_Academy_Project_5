import React, { useState } from "react";
import "./App.css";

import Navigation from "./component/NavBar/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import AllCases from "./component/AllCases/AllCases";
import Login from "./component/login/Login";
import NewCase from "./component/NewCase/NewCase";
import NewDonation from "./component/NewDonation/NewDonation";
import Home from "./component/Home/Home";

function App() {
  const [searchCase, setSearchCase] = useState("");
  const [categoryNav, setCategory] = useState("");
  const [allCase, setAllCase] = useState("");

  //--------------------------------- STORE
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");

  return (
    < >
       
      <Navigation
        setIsAdmin={setIsAdmin}
        isAdmin={isAdmin}
        setSearchCase={setSearchCase}
        setCategory={setCategory}
        setAllCase={setAllCase}
        userId={userId}
        setUserId={setUserId}
      />
   
  
   
      <Routes>
     
      <Route
          path="/"
          element={<Home/>}
        />
     
        <Route path="/register" element={<Register />} />
        <Route
          path="/allcases"
          element={
            <AllCases
              searchCase={searchCase}
              categoryNav={categoryNav}
              allCase={allCase}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setIsAdmin={setIsAdmin} isAdmin={isAdmin} setUserId={setUserId}/>}
        />
        <Route path="/newcase" element={<NewCase />} />
        <Route path="/casedetails/:id" element={<NewDonation isAdmin={isAdmin} />} />
      </Routes>
     
    </>
  );
}

export default App;
