
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../actions'
import NavBar from './NavBar'
import CountryCard from './CountryCard'
import styles from '../assets/css/Home.module.css'

const Home = () => {
  const { allCountries, countries } = useSelector((state) => ({ 
    allCountries: state.allCountries,
    countries: state.countries
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountries())
  },[dispatch])
  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {countries.length ?
          countries.map((c) => {
            return <CountryCard key={c.country_id} {...c} />
          }) :
          allCountries.map((c) => {
            return <CountryCard key={c.country_id} {...c} />
          })
        }
      </div>
    </>
  )
}

export default Home
