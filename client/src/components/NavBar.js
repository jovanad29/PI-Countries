
import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'
import '../assets/css/NavBar.css'

function NavBar() {
  return (
    <header>
        <div id='app-title'>Countries' App</div>
        <nav>
            <Link to='/home' className='btn btn-secondary'><li>Home</li></Link>
            <Link to='/activity/create' className='btn btn-primary'><li>Add Activity</li></Link>
        </nav>
    </header>
  )
}

export default NavBar