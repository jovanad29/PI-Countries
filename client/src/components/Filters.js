
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from '../assets/css/Filters.module.css'
import { filterByCriteria, getActivities } from '../actions/index'

function Filters() {
  const [selects, setSelects] = useState({})
  const activities = useSelector(state => state.activities)
  const dispatch = useDispatch()
  const handleChange = (e) => {
    setSelects({...selects, [e.target.name]: e.target.value})
  }
  useEffect(() => {
    dispatch(getActivities())
  }, [dispatch])
  useEffect(() => {
    dispatch(filterByCriteria(selects))
  },[dispatch, selects])
  
  return (
    <div className={styles.container}>
      <form>
        <div>
          <label htmlFor='continent'>Filter by Continent</label>
          <select className={styles.filters} name='continent' id='continent' onChange={handleChange}>
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
          <select className={styles.filters} name='activity' id='activity' onChange={handleChange}>
            <option value ='0'>Select an option</option>
              {activities?.map(a => {
                return <option key={a.activity_id} value = {a.activity_id}>{a.name}</option>
              })}
          </select>
        </div>
      </form>
    </div>
  )
}

export default Filters
