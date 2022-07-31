
import React from 'react'
import { Link } from 'react-router-dom'
import '../index.css'


const CountryCard = (props) => {
  const {country_id, name, continent, flag_img} = props
  return (
    <div className='cards'>
      <p>{name}</p>
      <img src={flag_img[1]} alt='country flag' width='150px' />
      <p>{continent}</p>
      <Link to={`/country/${country_id}`} className='btn btn-outline'>More</Link>
    </div>
  )
}

export default CountryCard