import React from 'react'
import { CiSquarePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import './navbar.css'
const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <h1>ProductStore</h1>
      </Link>
      <div className="additem">
        <Link to='/create'>
          <CiSquarePlus size={30} />
        </Link>
      </div>
    </div>
  )
}

export default Navbar;
