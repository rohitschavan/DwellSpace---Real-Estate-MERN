import React from "react";
import { NavLink } from "react-router-dom";
const SideBar = ()=>{
    return(
        <>
 <ul className="nav nav-tabs">
  <li className="nav-item">
    <NavLink className="nav-link " aria-current="page" to="/dashboard">Dashboard</NavLink>
  </li>
  <li className="nav-item d-flex flex-row">
    <NavLink className="nav-link" to="/ad/create">Link</NavLink>
    <NavLink className="nav-link" to="/user/wishlist">Wishlist</NavLink>
    <NavLink className="nav-link" to="/user/enquiries">Enquiries</NavLink>
    <NavLink className="nav-link" to="/user/profile">Profile</NavLink>
    <NavLink className="nav-link" to="/user/settings">Settings</NavLink>
  </li>
</ul>

        </>
    )
}

export default SideBar;