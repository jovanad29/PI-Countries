
import React from 'react'
import NavBar from '../NavBar/NavBar'
import styles from './NotFound.module.css'

function NotFound() {
  return (
    <div className={styles.container}>
        <NavBar />
        <h2>404 Not Found</h2>
    </div>
  )
}

export default NotFound