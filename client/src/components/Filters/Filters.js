
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Filters.module.css'
import { filterByCriteria, orderByCriteria, getActivities } from '../../redux/actions'

function Filters() {
  const { allCountries, activities } = useSelector(state => ({
    allCountries: state.allCountries,
    activities: state.activities
  }))
  const [filters, setFilters] = useState({})
  const dispatch = useDispatch()
  const handleFilter = (e) => {
    setFilters({...filters, [e.target.name]: e.target.value})
  }
  const handleOrder = (e) => {
    dispatch(orderByCriteria({[e.target.name]:e.target.value}))
  }
  useEffect(() => {
    document.getElementById('continent').value = '0'
    document.getElementById('activity').value = '0'
  }, [allCountries.length])
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])
  useEffect(() => {
    document.getElementById('order').value = '0'
    dispatch(filterByCriteria(filters))
  }, [dispatch, filters])
  
  return (
    <div className={styles.container}>
      <form>
        <div>
          <label htmlFor='continent'>Filter by Continent</label>
          <select className={styles.select} name='continent' id='continent' onChange={handleFilter}>
            <option value ='0'>Select an option</option>
              <option value='Africa'>Africa</option>
              <option value='Antarctica'>Antarctica</option>
              <option value='Asia'>Asia</option>
              <option value='Europe'>Europe</option>
              <option value='North America'>North America</option>
              <option value='Oceania'>Oceania</option>
              <option value='South America'>South America</option>
          </select>
        </div>
        <div>
          <label htmlFor='activity'>Filter by Activity</label>
          <select className={styles.select} name='activity' id='activity' onChange={handleFilter}>
            <option value ='0'>Select an option</option>
              {activities?.map(a => {
                return <option key={a.activity_id} value = {a.activity_id}>{a.name}</option>
              })}
          </select>
        </div>
        <div>
          <label htmlFor='order'>Order By</label>
          <select className={styles.select} name='order' id='order' onChange={handleOrder}>
            <option value='0'>Select an option</option>
            <option value='a-z'>A to Z</option>
            <option value='z-a'>Z to A </option>
            <option value='min-max'>Min Population to Max Population</option>
            <option value='max-min'>Max Population to Min Population</option>
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filters
