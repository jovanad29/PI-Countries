
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCountries, createActivity } from '../actions'
import styles from '../assets/css/FormActivity.module.css'

const FormActivity = () => {
  const countries = useSelector(state => state.countries)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCountries())
  },[dispatch])
  const [activity, setActivity] = useState({
      name: '',
      difficulty: '',
      duration: '',
      season:'',
      countries: []
  })
  const [selected, setSelected] = useState([])
  const [errors, setErrors] = useState({})
  const handleChange = (e) => {
    setActivity({...activity, [e.target.name]: e.target.value})
    setErrors(validate({...activity, [e.target.name]: e.target.value}))
  }
  const handleCountries = (e) => {
    setActivity({
      ...activity,
      countries: [...activity.countries, e.target.value]
    })
    setErrors(validate({...activity, countries: [...activity.countries, e.target.value]}))
    const index = e.nativeEvent.target.selectedIndex;
    const text = e.nativeEvent.target[index].text
    setSelected([...selected, {id:e.target.value, name:text}])
  }
  const delCountry = (id) => {
    const filteredCountries = activity.countries.filter(c => c !== id)
    setActivity({...activity, countries: filteredCountries})
    setErrors(validate({...activity, countries: filteredCountries}))
    setSelected(selected.filter(c => c.id !== id))
  }
  const incompleteActivity = a => {
    return Object.keys(a).some(key => {
      if (Array.isArray(a[key])) return a[key].length === 0
      return a[key] === ''
    })
  }
  const validate = (input) => {
    let errors = {}
    if (!input.name) {
      errors.name = 'Name is required'
    } else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(input.name)) {
      errors.name = 'Name is invalid'
    }
    if(!input.duration || input.duration < 1){
      errors.duration = 'Duration is required'
    }
    if (!parseInt(input.difficulty)){
      errors.difficulty = 'Difficulty is required'
    }
    if (!input.season || input.season === '0'){
      errors.season = 'Season is required'
    }
    if (!input.countries.length){
      errors.countries = 'You must select at least one country'
    }
    return errors
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createActivity(activity))
    alert("The activity has been created successfully")
  }
  const filteredCountries = countries.filter((c) => !activity.countries.includes(c.country_id))
  return (
    <main className={styles.container}>
      <h1>Add Activity</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.wrapper}>
          <div className='form'>
            <div>
              <label>Name</label>
              <input onChange={handleChange} type='text' name='name' value={activity.name} />
              {errors.name ? <small className='error'>{errors.name}</small> : <small>&nbsp;</small>}
            </div>
            <div>
              <label>Duration (in hours)</label>
              <input onChange={handleChange} type='number' name='duration' min='1' value={activity.duration} />
              {errors.duration ? <small className='error'>{errors.duration}</small> : <small>&nbsp;</small>}     
            </div>
            <div>
              <label>Difficulty</label>
              <select onChange={handleChange} name='difficulty'>
                <option value='0'>-None-</option>
                <option value='1'>Peaceful</option>
                <option value='2'>Easy</option>
                <option value='3'>Normal</option>
                <option value='4'>Hard</option>
                <option value='5'>Professional</option>
              </select>
              {errors.difficulty ? 
              <small className='error'>{errors.difficulty}</small> : 
              <small>&nbsp;</small>}         
            </div>
            <div>
              <label>Season</label>
              <select onChange={handleChange} name='season'>
                <option value='0'>-None-</option>
                <option value='Summer'>Summer</option>
                <option value='Spring'>Spring</option>
                <option value='Fall'>Fall</option>
                <option value='Winter'>Winter</option>
              </select>
              {errors.season ? <small className='error'>{errors.season}</small> : <small>&nbsp;</small>}        
            </div>
            <div>
              <label htmlFor='country'>Countries</label>
              <select onChange={handleCountries} name='countries' id='country'>
                <option value='0'>-None-</option>
                {filteredCountries?.map(c => {
                  return <option value={c.country_id} key={c.country_id}>{c.name}</option>
                })}
              </select>
              {errors.countries ? <small className='error'>{errors.countries}</small> : <small>&nbsp;</small>}  
            </div>
          </div>
          <div>
            <h2>Countries Selected:</h2>
            {selected.map((c)=>{
                return (
                  <div key={c.id} className={styles.country}>
                    <p>{c.name.length > 30 ? c.name.slice(0,30)+'...' : c.name}</p>
                    <button onClick={() => delCountry(c.id)}>&#10005;</button>                
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.buttons}>
          <Link to='/home' className='btn btn-secondary'>Back to Home</Link>
          {Object.keys(errors).length || incompleteActivity(activity) ?
            <input type='submit' className='btn btn-primary disabled' disabled/> :
            <input type='submit' className='btn btn-primary' />
          }
        </div>
      </form>
    </main>
  )
}

export default FormActivity
