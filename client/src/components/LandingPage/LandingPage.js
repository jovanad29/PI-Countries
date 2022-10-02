import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

function LandingPage() {
	return (
		<section className={styles.container}>
			{/* <article className={styles.textContainer}> */}
			<h1>Individual Project Henry Countries</h1>
			<h2>Developed by Jovana Davalillo with ❤</h2>
			<Link to='/home' className='btn btn-primary'>Let's Travel!</Link>
			{/* </article> */}
		</section>
	)
}

export default LandingPage