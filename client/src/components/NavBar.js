
import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import styles from '../assets/css/NavBar.module.css'

function NavBar() {
  return (
    <header>
      <Link to='/'><div id={styles.appTitle}>Countries' App</div></Link>
      <SearchBar />
      <Link to='/activity/create' className='btn btn-primary'><li>Add Activity</li></Link>
    </header>
  )
}

export default NavBar