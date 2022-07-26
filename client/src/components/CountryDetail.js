
import React from 'react'
import { Link } from 'react-router-dom'

import '../index.css'

const CountryDetail = (props) => {
  return (
    <div style={{border:'1px solid red'}}>
      <p>Hola, mundo!</p>
      <p>CountryDetail {props.match.params.id}</p>
      <Link to='/home' className='btn btn-enter'>Volver a home</Link>
    </div>
  )
}

export default CountryDetail