import React, { useState, useRef } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";

const App = () => {
  

  const [showLogin, setShowLogin] = useState(false);
  const [theme,setTheme] = useState("light");
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className={`app ${theme}`}>
        <Navbar theme={theme} setTheme={setTheme} setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home theme={theme}/>} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
