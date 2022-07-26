
import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'


const CountryCard = (props) => {
  return (
    <div className='cards'>
      <p>Hola, {props.id}!</p>
      <Link to={`/home/${props.id}`} className='btn btn-enter'>Ver detalles</Link>
    </div>
  )
}

export default CountryCard