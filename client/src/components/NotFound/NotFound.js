
import React from 'react'
import NavBar from '../NavBar/NavBar'
import styles from './NotFound.module.css'
import { Link } from 'react-router-dom'
import '../../index.css'

function NotFound() {
	return (
		<div className={styles.container}>
			<NavBar />
			<h2>404 Not Found</h2>
			<Link to='/home' className='btn btn-secondary'>Back to Home</Link>
		</div>
	)
}

export default NotFound