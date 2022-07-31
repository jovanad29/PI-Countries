
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import '../assets/css/CountryDetail.css'
import NavBar from './NavBar'

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
    <>
      <NavBar />
      <div className='container'>
        <div className='country-container'>
          {Object.keys(detail).length ?
            <>
              <h1>{detail.name}</h1>
              <img src={detail.flag_img[ 1 ]} alt='country flag' />
              <p>COD: {detail.country_id}</p>
              <p>CAPITAL: {detail.capital.join(', ')}</p>
              <p>CONTINENT: {detail.continent}</p>
              <p>SUBREGION: {detail.subregion ? detail.subregion : ''}</p>
              <p>AREA: {detail.area}km2</p>
              <p>POPULATION: {detail.population}</p>
              <ul>ACTIVITIES:{detail.activities.length ? 
                detail.activities.map(a => {
                  return <li key={a.activity_id}>{a.name}</li>
                }) : 
                <li>No activities registered</li>}
              </ul>
            </>
          
          : ''
          }
          <Link to='/home' className='btn btn-secondary'>Volver a home</Link> {/* goBack? */}
        </div>
      </div>
    </>
  )
}

export default CountryDetail
