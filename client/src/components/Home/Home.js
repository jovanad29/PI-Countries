
import React, { useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../../redux/actions'
import NavBar from '../NavBar/NavBar'
import Filters from '../Filters/Filters'
import CountryCard from '../CountryCard/CountryCard'
import Pagination from '../Pagination/Pagination'
import styles from './Home.module.css'
import Loader from '../Loader/Loader'

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
            <div className={styles.errorMsg}>
              <h3>{error.message}</h3>
            </div> :
            <Loader />
          }
        </div>
        <Pagination nPage={nPage} setPage={setPage} nPages={nPages} lPage={lastPage} />
      </main>
    </>
  )
}

export default Home
