
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../actions'
import NavBar from './NavBar'
import Filters from './Filters'
import CountryCard from './CountryCard'
import Pagination from './Pagination'
import styles from '../assets/css/Home.module.css'

const Home = () => {
  const { countries, error } = useSelector((state) => ({
    countries: state.countries,
    error: state.error
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountries())    
  },[dispatch])
  const [nPage, setPage] = useState(1)
  const perPage = nPage === 1 ? 9 : 10
  const lastPage = Math.ceil(countries.length / 10)
  let nPages = Math.ceil(countries.length / perPage)
  useEffect(() => {
    setPage(1)
  },[countries.length])
  return (
    <>
      <NavBar />
      <main>
        <Filters />
        <div className={styles.container}>
          {
            countries.length ?
              countries.slice(((nPage - 1) * perPage), (((nPage - 1) * perPage) + perPage)).map((c) => {
              return <CountryCard key={c.country_id} {...c} />
            }) : Object.keys(error).length ? 
            <div style={{flexDirection:'column'}}>
              <h3>{error.message}</h3>
            </div> :
            <p>Loading...</p>
          }
        </div>
        <Pagination nPage={nPage} setPage={setPage} nPages={nPages} lPage={lastPage} />
      </main>
    </>
  )
}

export default Home
