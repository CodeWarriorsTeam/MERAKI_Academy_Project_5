import React,{useState} from "react";
import "./App.css";

import Navigation from "./component/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import AllCases from "./component/AllCases/AllCases";
import Login from "./component/login/Login";
import NewCase from "./component/NewCase/NewCase";
import NewDonation from "./component/NewDonation/NewDonation";

function App() {
  const [searchCase, setSearchCase] = useState("");
  const [categoryNav, setCategory] = useState("");
  const [allCase, setAllCase] = useState("");
  
  return (
    <div className="App">
      <Navigation setSearchCase={setSearchCase} setCategory={setCategory} setAllCase={setAllCase} />
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/allcases" element={<AllCases searchCase={searchCase} categoryNav={categoryNav} allCase={allCase}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/newcase" element={<NewCase />} />
        <Route path="/casedetails/:id" element={<NewDonation />} />


        
      </Routes>
    </div>
  );
}

export default App;
