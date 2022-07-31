
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../actions'
import NavBar from './NavBar'
import CountryCard from './CountryCard'
import SearchBar from './SearchBar'
import '../assets/css/Home.css'
import Sort from './Sort'
import Filters from './Filters'
import axios from 'axios'

const Home = () => {
  const allCountries = useSelector(state => state.countries)
  const dispatch = useDispatch()
  const [countries, setCountries] = useState([])
  useEffect(() => {
    dispatch(getCountries())
  },[dispatch])
  const onSearch = async (searched) => {
    const { data } = await axios.get('http://localhost:3001/countries?name='+searched) 
    setCountries(data)
  }
  return (
    <>
      <NavBar />
      <div className='container'>
        <div className='filters-container'>
          <SearchBar onSearch={onSearch}/>
          <Sort />
          <Filters />
        </div>
        <div className='cards-container'>
            {countries.length ?
              countries.map((c) => {
                return <CountryCard key={c.country_id} {...c} />
              }).slice(0,9) :
              allCountries.map((c) => {
                return <CountryCard key={c.country_id} {...c} />
              }).slice(0,9)
            }
        </div>
      </div>
    </>
  )
}

export default Home
