import React from "react";
import "./App.css";
import Navigation from "./component/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./component/register/Register";
import AllCases from "./component/AllCases/AllCases";
import Login from "./component/login/Login";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        
        <Route path="/register" element={<Register />} />
        <Route path="/allcases" element={<AllCases />} />
        <Route path="/login" element={<Login />} />

        
      </Routes>
    </div>
  );
}

export default App;
