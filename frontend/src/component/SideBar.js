import React from "react";
import { Link } from "react-router-dom";



const SideBar = ()=>{

    return (
        <>
        <ul>
        <li> <Link to="/admin/cases">Manage Cases</Link></li>

      <li>  <Link to="/admin/users">Manage Users</Link></li>
       <li> <Link to="/admin/volunteers">Manage Volunteers</Link></li>
        </ul>
        </>
    )

}
export default SideBar