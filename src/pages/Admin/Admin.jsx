import React from 'react'
import './Admin.css'
import AdminSidebar from '../../components/AdminSidebar/AdminSidebar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import AdminNavbar from '../../components/AdminNavbar/AdminNavbar'

const Admin = () => {
  return (
    <>
    <ToastContainer/>
    <AdminNavbar />
    <hr />
    <div className='content'>
      <AdminSidebar />
      <Outlet />
    </div>
    
    
    </>
  )
}

export default Admin