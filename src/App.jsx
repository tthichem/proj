import React, { useState, useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./components/Login/Login";
import Add from "./pages/Add/Add";
import Lister from "./pages/Lister/Lister"
import Reports from "./pages/Reports/Reports";


const App = () => {
  

  const [showLogin, setShowLogin] = useState(false);
  const [theme,setTheme] = useState("light");
  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className={`app ${theme}`}>
        
        <Routes>
          <Route path="/" element={<Home theme={theme}/>} />
          <Route path="/admin" element={<Admin />} >
          <Route path="add" element={<Add />} />
          <Route path="liste" element={<Lister />} />
          <Route path="reports" element={<Reports/>}/>
          </Route>
          
        </Routes>
      </div>
    </>
  );
};

export default App;
