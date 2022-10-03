
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './CountryDetail.module.css'
import '../../index.css'
import NavBar from '../NavBar/NavBar'
import Loader from '../Loader/Loader'
import { useDispatch } from 'react-redux'
import { deleteActivityFromCountry } from '../../redux/actions'
import { getCountryDetails } from '../../services/getCountryDetails'
import { FaTrashAlt } from "react-icons/fa";

const CountryDetail = () => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const [ detail, setDetail ] = useState({})
	const difficulties = { 1: 'Peaceful', 2: 'Easy', 3: 'Normal', 4: 'Hard', 5: 'Professional' }
	useEffect(() => {
		document.getElementById('app').classList.add('filter')
		document.getElementById('app').classList.add('border')
		getCountryDetails(id).then(c => setDetail(c)).catch(e => console.log(e))
		return () => {
			document.getElementById('app').classList.remove('filter')
			document.getElementById('app').classList.remove('border')
		}
	}, [ id ])
	const handleDelete = (a_id, c_id) => {
		const answer = window.confirm("Do you really want to delete this activity?");
		if (answer) {
			dispatch(deleteActivityFromCountry(a_id, c_id));
			window.location.reload()
		}
	}
	if (!Object.keys(detail).length) return (<><NavBar /><Loader /></>)
	return (
		<>
			<NavBar />
			<section className={styles.container}>
				<div className='back-btn'>
					<Link to='/home' className='btn btn-secondary'>Back to Home</Link>
				</div>
				{Object.keys(detail).length
					&&
					<>
						<article className={styles.description}>
							<div className={styles.img}>
								<figure>
									<img className={styles.flag} src={detail.flag_img[ 0 ]} alt={`${detail.name} flag`} />
								</figure>
							</div>
							<section className={styles.details}>
								<ul>
									<li><h2>{detail.name.toUpperCase()}</h2></li>
									<li><strong>Capital: </strong>{detail.capital.join(', ')}</li>
									<li><strong>Subregion: </strong>{detail.subregion ? detail.subregion : 'N/A'}</li>
									<li><strong>Area: </strong>{new Intl.NumberFormat('en-US').format(detail.area)} km<sup>2</sup></li>
									<li><strong>Population: </strong>{new Intl.NumberFormat('en-US').format(detail.population)}</li>
								</ul>
							</section>
						</article>
						<section className={styles.activities}>
							<h2>ACTIVITIES</h2>
							{
								detail.activities.length
									?
									detail.activities.map(a => {
										return (
											<div className={styles.activityWrapper} key={Math.random()}>
												<div className={styles.nameWrapper}>
													<p><strong>{a.name.toUpperCase()}</strong></p>
													<button className='btn btn-secondary' onClick={(e) => handleDelete(a.activity_id, id)}>
														<FaTrashAlt />
													</button>
												</div>
												<ul className={styles.activityGrid}>
													<li>
														<strong>Difficulty:</strong>
														<div className={styles.box}>
															<p>{difficulties[ a.difficulty ]}</p>
														</div>
													</li>
													<li>
														<strong>Duration:</strong>
														<div className={styles.box}>
															<p>{a.duration} hours</p>
														</div>
													</li>
													<li>
														<strong>Seasons:</strong>
														<div className={styles.box} key={Math.random()}>
															<ul className={styles.seasons}>
																{
																	a.seasons.map(s => {
																		return (
																			<li key={Math.random()}>
																				<img src={s.icon} alt={`${s.name} icon`} width={24} />
																				<p>{s.name}</p>
																			</li>
																		)
																	})
																}
															</ul>
														</div>
													</li>
												</ul>
											</div>
										)
									})
									: <p>No activites registered</p>
							}
						</section>
					</>
				}
			</section>
		</>
	)
}

export default CountryDetail
