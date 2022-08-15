
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './CountryDetail.css'
import NavBar from '../NavBar/NavBar'
import { useDispatch } from 'react-redux'
import { deleteActivityFromCountry } from '../../redux/actions'

const CountryDetail = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const [detail, setDetail] = useState({})
  const difficulties = {1:'Peaceful', 2:'Easy', 3:'Normal', 4:'Hard', 5:'Professional'}
  useEffect(()=>{
    axios.get("http://localhost:3001/countries/"+id).then(
      (res) => {
        const { data } = res
        setDetail(data)
      }
    ).catch(e => console.log(e))
  },[id])
  const handleDelete = (a_id,c_id) => {
    const answer = window.confirm("Do you really want to delete this activity?");
      if (answer) {
        dispatch(deleteActivityFromCountry(a_id,c_id));
        window.location.reload()
      }
  }
  return (
    <>
      <NavBar />
      <main className='container'>
        {Object.keys(detail).length ?
          <div className='details-container'>
          <h1>{detail.name}</h1>
          <div className='details-wrapper'>
            <div className='box'>
              <img src={detail.flag_img[ 0 ]} alt='country flag' width={480} />
              <p>COD: {detail.country_id}</p>
              <p>CAPITAL: {detail.capital.join(', ')}</p>
              <p>CONTINENT: {detail.continent}</p>
              <p>SUBREGION: {detail.subregion ? detail.subregion : 'N/A'}</p>
              <p>AREA: {new Intl.NumberFormat().format(detail.area)} km<sup>2</sup></p>
              <p>POPULATION: {new Intl.NumberFormat().format(detail.population)}</p>
            </div>
            <div className='box'>
              <h2>ACTIVITIES</h2>
              <ul>
                {detail.activities.length ? 
                  detail.activities.map(a => {
                    return (
                    <div className='activity'  key={Math.random()}>
                      <h3 key={a.activity_id}>{a.name}</h3>
                      <ul key={Math.random()}>
                        <li>Difficulty: {difficulties[a.difficulty]}</li>
                        <li>Duration: {a.duration} hours</li>
                        <li>Season: {a.season}</li>
                        <li><button onClick={(e) => handleDelete(a.activity_id,id)}>X</button></li>
                      </ul>
                    </div>
                    )
                  }) : 
                <li>No activities registered</li>}
              </ul>
            </div>
          </div>     
        </div>
        : ''
        }
        <Link to='/home' className='btn btn-secondary'>Back to Home</Link>
      </main>
    </>
  )
}

export default CountryDetail
