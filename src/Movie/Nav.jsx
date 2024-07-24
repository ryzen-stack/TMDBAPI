import React from 'react'
import { NavLink } from 'react-router-dom'
import './nav.css'
import { IoIosSearch } from "react-icons/io";

function Nav() {
  return (
    <nav>
      <NavLink to='/' >movies</NavLink>
      {/* <NavLink to='/search' ><IoIosSearch /></NavLink> */}
      <NavLink to='/Tvshow' >TvShows</NavLink>
    </nav>
  )
}

export default Nav
