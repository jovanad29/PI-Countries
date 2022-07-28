
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getCountryDetail } from '../actions'

import '../index.css'

const CountryDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  useEffect( () => {
    console.log(id)
    dispatch(getCountryDetail(id))
  },[dispatch, id])
  const country = useSelector(store => store.country)
  return (
    <div style={{border:'1px solid red'}}>
      <h1>CountryDetail</h1>
      <p>{country.country_id}</p>
      <p>{country.name}</p>
      <p>{country.area}km2</p>
      <p>{country.population}</p>
      <ul>{country.activities?.map(a => {
        return <li key={a.activity_id}>{a.name}</li>
      })}</ul>
      <Link to='/home' className='btn btn-enter'>Volver a home</Link> {/* goBack? */}
    </div>
  )
}

export default CountryDetail
