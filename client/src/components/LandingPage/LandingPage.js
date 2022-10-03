import React from 'react'
import { Link } from 'react-router-dom'
import styles from './LandingPage.module.css'

function LandingPage() {
	return (
		<section className={styles.container}>
			{/* <article className={styles.textContainer}> */}
			<h1>Individual Project Henry Countries</h1>
			<h2>Developed by
				<a className={styles.yellow} href='https://www.linkedin.com/in/jovana-davalillo/' target='_blank' rel="noreferrer">
					&nbsp;Jovana Davalillo&nbsp;
				</a>
				with <span className={styles.red}>❤</span>
			</h2>
			<Link to='/home' className='btn btn-primary'>Let's Travel!</Link>
			{/* </article> */}
		</section>
	)
}

export default LandingPage