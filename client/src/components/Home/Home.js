
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries } from '../../redux/actions'
import NavBar from '../NavBar/NavBar'
import Filters from '../Filters/Filters'
import CountryCard from '../CountryCard/CountryCard'
import Pagination from '../Pagination/Pagination'
import styles from './Home.module.css'
import Loader from '../Loader/Loader'
import { IoArrowUp, IoArrowDown } from "react-icons/io5";

const Home = () => {
	const { countries, error } = useSelector((state) => ({
		countries: state.countries,
		error: state.error
	}))
	const [ filterIsActive, setFilterIsActive ] = useState(false);
	const dispatch = useDispatch()
	useEffect(() => {
		document.getElementById('app').classList.add('filter')
		document.getElementById('app').classList.add('border')
		dispatch(getCountries())
		return () => {
			document.getElementById('app').classList.remove('filter')
			document.getElementById('app').classList.remove('border')
		}
	}, [ dispatch ])
	const [ nPage, setPage ] = useState(1)
	const perPage = 8
	let nPages = Math.ceil(countries.length / perPage)
	useEffect(() => {
		setPage(1)
	}, [ countries.length ])
	let shownCountries = countries.slice(((nPage - 1) * perPage), (((nPage - 1) * perPage) + perPage))
	if (!countries.length && !Object.keys(error).length) return (<><NavBar /> <Loader /></>)
	return (
		<>
			<NavBar />
			<div className={styles.filtersContainer}>
				<div className={styles.wrapper}>
					<div>
						<p>{filterIsActive ? 'Hide' : 'Show'} Filters</p>
					</div>
					<button onClick={() => setFilterIsActive(!filterIsActive)} className={styles.toggleBtn}>
						{filterIsActive ? <IoArrowUp /> : <IoArrowDown />}
					</button>
				</div>
			</div>
			{filterIsActive && <Filters />}
			<div className={styles.container}>
				<Pagination nPage={nPage} setPage={setPage} nPages={nPages} />
				<div className={styles.cardsContainer}>
					{
						shownCountries.length
							?
							shownCountries.map((c) => {
								return <CountryCard key={c.country_id} {...c} />
							})
							: <div className={styles.errorMsg}>
								<h3>{error.message}</h3>
							</div>
					}
				</div>
				{/* <Pagination nPage={nPage} setPage={setPage} nPages={nPages} /> */}
			</div>
		</>
	)
}

export default Home
