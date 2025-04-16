import React from 'react'
import './AdminNavbar.css'
import logo from '../../assets/logo-dark.png'
import profile from '../../assets/profile.jpg'

const AdminNavbar = () => {
  return (
    <div className='navbar'>
        <img src={logo} alt=""  className='logo'/>
        <div className="pro-container">
        <img src={profile} alt="" className='profile'/>
        </div>
    </div>
  )
}

export default AdminNavbar