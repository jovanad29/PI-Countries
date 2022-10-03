
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCountries } from '../../redux/actions'
import styles from './FormActivity.module.css'
import { FaTrashAlt } from 'react-icons/fa'
import { postActivity } from '../../services/postActivity'
import { Footer } from '../Footer/Footer'

const FormActivity = () => {
	const countries = useSelector(state => state.countries)
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getCountries())
		document.getElementById('app').classList.add('filter')
		document.getElementById('app').classList.add('border')
		return () => {
			document.getElementById('app').classList.remove('filter')
			document.getElementById('app').classList.remove('border')
		}
	}, [ dispatch ])
	const [ activity, setActivity ] = useState({
		name: '',
		difficulty: '',
		duration: '',
		seasons: [],
		countries: []
	})
	const [ selected, setSelected ] = useState([])
	const [ errors, setErrors ] = useState({})
	const handleChange = (e) => {
		setActivity({ ...activity, [ e.target.name ]: e.target.value })
		// setErrors(validate({ ...activity, [ e.target.name ]: e.target.value }))
	}
	const handleCountries = (e) => {
		setActivity({
			...activity,
			countries: [ ...activity.countries, e.target.value ]
		})
		// setErrors(validate({ ...activity, countries: [ ...activity.countries, e.target.value ] }))
		const country = countries.find(c => c.country_id === e.target.value)
		setSelected([ ...selected, { id: e.target.value, name: country.name, icon: country.flag_img[ 1 ] } ])
	}
	const delCountry = (id) => {
		const filteredCountries = activity.countries.filter(c => c !== id)
		setActivity({ ...activity, countries: filteredCountries })
		// setErrors(validate({ ...activity, countries: filteredCountries }))
		setSelected(selected.filter(c => c.id !== id))
	}
	const incompleteActivity = a => {
		return Object.keys(a).some(key => {
			if (Array.isArray(a[ key ])) return a[ key ].length === 0
			return a[ key ] === ''
		})
	}
	useEffect(() => {
		setErrors(validate(activity))
	}, [ activity ])
	const validate = (input) => {
		let errors = {}
		if (!input.name) {
			errors.name = 'Name is required'
		} else if (!/^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g.test(input.name)) {
			errors.name = 'Name is invalid'
		}
		if (!input.duration || input.duration < 1) {
			errors.duration = 'Duration is required'
		}
		if (!parseInt(input.difficulty)) {
			errors.difficulty = 'Difficulty is required'
		}
		if (!input.seasons.length) {
			errors.season = 'You must select at least one season'
		}
		if (!input.countries.length) {
			errors.countries = 'You must select at least one country'
		}
		return errors
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const a = await postActivity(activity)
			alert(`Activity ${a.name} added successfully!`);
			window.location.reload()
		} catch (error) {
			alert(error)
		}
	}
	const handleCheckbox = (e) => {
		if (e.target.checked) {
			setActivity({
				...activity,
				seasons: [ ...activity.seasons, e.target.value ]
			})
		} else {
			setActivity({
				...activity,
				seasons: activity.seasons.filter(s => s !== e.target.value)
			})
		}
	}
	const filteredCountries = countries.filter((c) => !activity.countries.includes(c.country_id))
	return (
		<>
			<section className={styles.container}>
				<h1>CREATE NEW ACTIVITY</h1>
				<form onSubmit={handleSubmit}>
					<div className={styles.formContainer}>

						<div className={styles.form}>
							<h2>Form:</h2>
							<div className={styles.fields}>
								<div className={styles.field}>
									<label>Name:</label>
									<input onChange={handleChange} type='text' name='name' value={activity.name} />
									{errors.name ? <small className='error'>{errors.name}</small> : <small>&nbsp;</small>}
								</div>
								<div className={styles.field}>
									<label>Duration (in hours):</label>
									<input onChange={handleChange} type='number' name='duration' min='1' value={activity.duration} />
									{errors.duration ? <small className='error'>{errors.duration}</small> : <small>&nbsp;</small>}
								</div>
								<div className={styles.field}>
									<label>Difficulty:</label>
									<select onChange={handleChange} name='difficulty'>
										<option value='0'>-Select an option-</option>
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
								<div className={styles.field}>
									<label>Seasons:</label>
									<div className={styles.chks}>
										<label><input type='checkbox' onChange={handleCheckbox} value='Summer' />&nbsp;Summer</label>
										<label><input type='checkbox' onChange={handleCheckbox} value='Spring' />&nbsp;Spring</label>
										<label><input type='checkbox' onChange={handleCheckbox} value='Fall' />&nbsp;Fall</label>
										<label><input type='checkbox' onChange={handleCheckbox} value='Winter' />&nbsp;Winter</label>
									</div>
									{errors.season ? <small className='error'>{errors.season}</small> : <small>&nbsp;</small>}
								</div>
								<div className={styles.field}>
									<label htmlFor='country'>Countries:</label>
									<select onChange={handleCountries} name='countries' id='country'>
										<option value='0'>-Select an option-</option>
										{filteredCountries?.map(c => {
											return <option value={c.country_id} key={c.country_id}>{c.name}</option>
										})}
									</select>
									{errors.countries ? <small className='error'>{errors.countries}</small> : <small>&nbsp;</small>}
								</div>
							</div>
						</div>
						<div className={styles.countriesContainer}>
							<h2>Countries Selected:</h2>
							{
								selected?.map((c) => {
									return (
										<div key={c.id} className={styles.country}>
											<div>
												<img src={c.icon} alt={`${c.name} icon`} />
												<p>{c.name}</p>
											</div>
											<button className='btn btn-secondary' onClick={() => delCountry(c.id)}><FaTrashAlt /></button>
										</div>
									)
								})
							}
						</div>
					</div>
					<div className={styles.buttons}>
						<Link to='/home' className='btn btn-secondary'>Back to Home</Link>
						{Object.keys(errors).length || incompleteActivity(activity) ?
							<input type='submit' className='btn btn-primary disabled' disabled value='Create Activity' /> :
							<input type='submit' className='btn btn-primary' value='Create Activity' />
						}
					</div>
				</form>
			</section>
			<Footer />
		</>
	)
}

export default FormActivity
