import React from 'react'
import './AdminSidebar.css'
import { IoAdd } from "react-icons/io5";
import { PiListChecksFill } from "react-icons/pi";
import { MdReport } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className='sidebar'>
        <div className="options">
            <NavLink to='/admin/add' className="option">
                <IoAdd />
                <p>Add Modules</p>
            </NavLink>
            <NavLink to='/admin/liste' className="option">
                <PiListChecksFill />
                <p>List Modules</p>
            </NavLink>
            <NavLink to='/admin/reports' className="option">
                <MdReport />
                <p>MdReport</p>
            </NavLink>
        </div>
    </div>
  )
}

export default AdminSidebar