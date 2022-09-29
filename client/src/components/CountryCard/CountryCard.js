
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './CountryCard.module.css'


const CountryCard = (props) => {
  const {country_id, name, continent, flag_img} = props
  return (
    <div className={styles.card}>
      <p>{name.length > 19 ? name.slice(0,20)+'...' : name}</p>
      <img src={flag_img[1]} alt='country flag' />
      <p>{continent}</p>
      <Link to={`/country/${country_id}`} className={`btn ${styles.btnOutline}`}>More</Link>
    </div>
  )
}

export default CountryCard