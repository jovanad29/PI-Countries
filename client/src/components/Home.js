
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../actions'
import NavBar from './NavBar'
import Filters from './Filters'
import CountryCard from './CountryCard'
import Pagination from './Pagination'
import styles from '../assets/css/Home.module.css'

const Home = () => {
  const { countries, filtered, error } = useSelector((state) => ({
    countries: state.countries,
    filtered: state.filteredCountries,
    error: state.error
  }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountries())    
  },[dispatch])
  const whatCountries = !filtered.length && !Object.keys(error).length ? countries : filtered
  const [nPage, setPage] = useState(1)
  const perPage = nPage === 1 ? 9 : 10
  const lastPage = whatCountries.length / 10
  let nPages = Math.ceil(whatCountries.length / perPage)
  return (
    <>
      <NavBar />
      <Filters />
      {/* <Pagination nPage={nPage} setPage={setPage} nPages={nPages} /> */}
      <div className={styles.container}>
        {
          whatCountries.slice(((nPage - 1) * perPage), (((nPage - 1) * perPage) + perPage)).map((c) => {
            return <CountryCard key={c.country_id} {...c} />
          })
        }
        <div style={{flexDirection:'column'}}>
          <h3>{error.message}</h3>
        </div>
      </div>
      <Pagination nPage={nPage} setPage={setPage} nPages={nPages} lPage={lastPage} />
    </>
  )
}

export default Home
