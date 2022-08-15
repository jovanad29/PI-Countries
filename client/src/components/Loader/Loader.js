
import React from 'react'
import styles from './Loader.module.css'

function Loader() {
  return (
    // <div className={styles.ldsCircle}><div></div></div>
    <div className={styles.container}>
    <p>Loading</p>
    <div class={styles.loader}></div>
    </div>
  )
}

export default Loader