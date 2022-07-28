
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../actions'
import CountryCard from './CountryCard'

const Home = () => {
  const countries = useSelector(state => state.countries)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountries())
  },[dispatch])
  return (
    <div className='cards-container'>
        {countries?.map((c, idx) => {
            return <CountryCard key={idx} id={c.country_id} />
        })}
    </div>
  )
}

export default Home
