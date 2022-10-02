
import React, { useEffect, useState } from 'react'
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
	}, [ dispatch ])
	const [ nPage, setPage ] = useState(1)
	const perPage = 8
	let nPages = Math.ceil(countries.length / perPage)
	useEffect(() => {
		setPage(1)
	}, [ countries.length ])
	let shownCountries = countries.slice(((nPage - 1) * perPage), (((nPage - 1) * perPage) + perPage))
	return (
		<>
			<NavBar />
			<Filters />
			<div className={styles.container}>
				<Pagination nPage={nPage} setPage={setPage} nPages={nPages} />
				<div className={styles.cardsContainer}>
					{
						shownCountries.length ?
							shownCountries.map((c) => {
								return <CountryCard key={c.country_id} {...c} />
							}) : Object.keys(error).length ?
								<div className={styles.errorMsg}>
									<h3>{error.message}</h3>
								</div> :
								<Loader />
					}
				</div>
				<Pagination nPage={nPage} setPage={setPage} nPages={nPages} />
			</div>
		</>
	)
}

export default Home
