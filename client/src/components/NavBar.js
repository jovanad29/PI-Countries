
import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import styles from '../assets/css/NavBar.module.css'

function NavBar() {
  return (
    <header>
      <div id={styles.appTitle}>Countries' App</div>
      <SearchBar />
      <Link to='/activity/create' className='btn btn-primary'><li>Add Activity</li></Link>
    </header>
  )
}

export default NavBar