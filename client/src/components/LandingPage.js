import React from 'react'
import { Link } from 'react-router-dom'
import styles from '../assets/css/LandingPage.module.css'

function LandingPage() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
          <h1>Henry Countries</h1>
          <h2>Individual Proyect</h2>
          <Link to='/home' className='btn btn-primary'>Let's Travel!</Link>
      </div>
    </div>
  )
}

export default LandingPage