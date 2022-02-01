import React from "react";
import "./App.css";
import Navigation from "./component/Navigation";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";

function App() {
  return (
    <div className="App">
      <Navigation
      />
      <Routes>
        <Route path="/register" element={<Register />} />
        </Routes>

    </div>
  );
}

export default App;
