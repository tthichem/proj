import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo-dark.png'
import lightLogo from '../../assets/logo-dar.png'
import { FaSearch } from 'react-icons/fa'
import Search from '../Search/Search'
import { MdDarkMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md"; 
import SearchBar from '../searchBar/SearchBar'



const Navbar = ({setShowLogin,theme,setTheme}) => {

    const [menu,setMenu] = useState("Home");

    const dark =()=>{
      theme === "light" ? setTheme("dark") :setTheme("light");
    }

  return (
    <div className='navbar'>
        <img src={theme === 'light' ? logo : lightLogo} alt="logo" className='logo'/>
        <ul className={`navbar-menu ${theme}`}>
            <li onClick={()=>setMenu("Home") } className={menu === "Home"?"active":""}>Home</li>
            <li onClick={()=>setMenu("Archive")} className={menu === "Archive"?"active":""}>Archive</li>
            <li onClick={()=>setMenu("About")} className={menu === "About"?"active":""}>About</li>
            <li onClick={()=>setMenu("Contact us")} className={menu === "Contact us"?"active":""}>Contact us</li>
        </ul>
        <div className="navbar-right">
            

            <SearchBar theme={theme}/>
            <div onClick={()=>{dark()}} className='dark-light'>{theme ==='light' ?(
              <MdDarkMode />): (
                <MdOutlineDarkMode className='light'/>
              )}
              </div>
            <button onClick={()=>setShowLogin(true)} className={`login-buttona ${theme}`}>Login</button>
        </div>
    </div>
  )
}

export default Navbar