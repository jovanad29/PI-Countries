
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './NavBar.module.css'

function NavBar() {
	return (
		<header>
			<Link to='/'><div id={styles.appTitle}>Countries' App</div></Link>
			<Link to='/activity/create' className='btn btn-primary'>Add Activity</Link>
		</header>
	)
}

export default NavBar