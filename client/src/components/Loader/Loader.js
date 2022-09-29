
import React from 'react'
import styles from './Loader.module.css'

function Loader() {
  return (
    <div className={styles.container}>
      <p>Loading</p>
      <div className={styles.loader}></div>
    </div>
  )
}

export default Loader