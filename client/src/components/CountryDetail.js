
import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
// import { getCountryDetail } from '../actions'

import '../index.css'

const CountryDetail = () => {
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  useEffect(()=>{
    axios.get("http://localhost:3001/countries/"+id).then(
      (res) => {
        const { data } = res
        setDetail(data)
      }
    ).catch(e => console.log(e))
  },[id])
  return (
    <div style={{border:'1px solid red'}}>
      <h1>CountryDetail</h1>
      <p>{detail.country_id}</p>
      <p>{detail.name}</p>
      <p>{detail.area}km2</p>
      <p>{detail.population}</p>
      <ul>{detail.activities?.map(a => {
        return <li key={a.activity_id}>{a.name}</li>
      })}</ul>
      <Link to='/home' className='btn btn-enter'>Volver a home</Link> {/* goBack? */}
    </div>
  )
}

export default CountryDetail
